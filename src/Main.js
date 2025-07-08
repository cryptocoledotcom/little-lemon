import React, { useReducer } from 'react';
import { fetchAPI, submitAPI } from './api';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import ConfirmedBooking from './pages/ConfirmedBooking';

export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    const date = new Date(action.payload.replace(/-/g, '/'));
    return fetchAPI(date);
  }
  return state;
};

export const initializeTimes = () => {
  // Fetch times for today's date to initialize the state.
  return fetchAPI(new Date());
};

const Main = () => {
  // Initialize the state by calling initializeTimes().
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate('/confirmed-booking');
    }
  };

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />} />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default Main;