import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        <h2>No Events Available</h2>
        <p>There are currently no upcoming events. Please check back later or create a new event.</p>
      </div>
    </div>
  );
};

export default Home;
