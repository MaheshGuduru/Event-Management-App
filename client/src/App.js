import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => (
  <Router>
    <Navbar />
    <Routes> {/* Use Routes instead of Switch */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-event" element={<PrivateRoute component={CreateEvent} />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/profile" element={<PrivateRoute component={Profile} />} />
    </Routes>
  </Router>
);

export default App;
