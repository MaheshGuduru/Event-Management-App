const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

// Create Event
router.post('/create', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('date', 'Please include a valid date').isDate()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newEvent = new Event({
      ...req.body,
      organizer: req.userId
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Edit Event
router.put('/edit/:id', auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.organizer.toString() !== req.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(event);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete Event
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.organizer.toString() !== req.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Event.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Event removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get Events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'username').sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
