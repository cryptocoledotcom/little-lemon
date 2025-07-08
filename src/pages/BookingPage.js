import React from 'react';
import BookingForm from '../components/BookingForm';
import '../styles/BookingPage.css';

const BookingPage = ({ availableTimes = [], dispatch, submitForm }) => {
  return (
    <div className="booking-page">
      <h1>Book a Table</h1>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    </div>
  );
};

export default BookingPage;
