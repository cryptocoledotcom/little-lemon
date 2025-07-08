import React, { useState, useEffect } from 'react';
// import './BookingFormStyles.css'; // Temporarily commented out for this test

const BookingForm = ({ availableTimes = [], dispatch, submitForm }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  // When availableTimes updates, set the time to the first available time.
  useEffect(() => {
    if (availableTimes && availableTimes.length > 0) {
      setTime(availableTimes[0]);
    } else {
      setTime('');
    }
  }, [availableTimes]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    dispatch({ type: 'UPDATE_TIMES', payload: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { date, time, guests, occasion };
    submitForm(formData);
  };

  const isFormValid = time && guests >= 1 && guests <= 10;

  const formStyles = {
    display: 'grid',
    maxWidth: '350px',
    gap: '20px',
    margin: '0 auto',
  };

  return (
    <form className="booking-form" style={formStyles} onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input type="date" id="res-date" value={date} onChange={handleDateChange} required min={today} />

      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" value={time} onChange={(e) => setTime(e.target.value)} required>
        <option value="" disabled>
          {availableTimes.length > 0 ? 'Select a time' : 'No times available'}
        </option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input type="number" placeholder="1" min="1" max="10" id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} required />

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input type="submit" value="Make Your reservation" className="cta-button" disabled={!isFormValid} />
    </form>
  );
};

export default BookingForm;