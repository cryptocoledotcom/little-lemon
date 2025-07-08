import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingPage from './BookingPage';

describe('BookingPage', () => {
  test('renders the booking form with a heading', () => {
    // Mock the props that BookingPage expects
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();

    render(
      <BookingPage
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    // Check for heading
    const headingElement = screen.getByRole('heading', { name: /Book a Table/i });
    expect(headingElement).toBeInTheDocument();

    // Check that the form is rendered by looking for one of its key elements.
    // We don't need to test the whole form here, as that's done in BookingForm.test.js
    const dateInput = screen.getByLabelText(/Choose date/i);
    expect(dateInput).toBeInTheDocument();
  });
});
