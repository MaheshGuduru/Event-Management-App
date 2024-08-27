import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '', description: '', date: '', time: '', location: '', category: '', capacity: ''
  });

  const { title, description, date, time, location, category, capacity } = eventData;

  const onChange = (e) => setEventData({ ...eventData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/events/create', eventData, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      // Redirect to event details or profile page
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="title" value={title} onChange={onChange} required />
      <textarea name="description" value={description} onChange={onChange} required />
      <input type="date" name="date" value={date} onChange={onChange} required />
      <input type="time" name="time" value={time} onChange={onChange} required />
      <input type="text" name="location" value={location} onChange={onChange} required />
      <input type="text" name="category" value={category} onChange={onChange} required />
      <input type="number" name="capacity" value={capacity} onChange={onChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
