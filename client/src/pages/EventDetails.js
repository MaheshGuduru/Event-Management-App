import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`/api/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Category: {event.category}</p>
      <p>Capacity: {event.capacity}</p>
      <button>Register</button>
    </div>
  );
};

export default EventDetails;
