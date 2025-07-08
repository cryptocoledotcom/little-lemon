import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

// Mock functions to pass as props
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

describe('BookingForm', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];

  beforeEach(() => {
    // Reset mocks before each test
    mockDispatch.mockClear();
    mockSubmitForm.mockClear();
  });

  test('renders all form fields and the submit button', () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    // Check for labels and corresponding inputs
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
  });

  test('submit button is disabled when form is not fully filled', () => {
    render(
      <BookingForm
        availableTimes={[]} // No times available initially
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled by default when times are available', () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    expect(submitButton).toBeEnabled();
  });

  test('HTML5 validation attributes are applied correctly', () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('min');

    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('shows/hides error message and enables/disables submit based on guest number validity', async () => {
    const user = userEvent.setup();
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });

    // Test with an invalid value (e.g., 0)
    await user.clear(guestsInput);
    await user.type(guestsInput, '0');

    // Wait for the error message to appear and button to be disabled
    await waitFor(() => {
      expect(screen.getByText('Number of guests must be between 1 and 10.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    // Test with another invalid value (e.g., 11)
    await user.clear(guestsInput);
    await user.type(guestsInput, '11');

    await waitFor(() => {
      expect(screen.getByText('Number of guests must be between 1 and 10.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    // Test with a valid value again
    await user.clear(guestsInput);
    await user.type(guestsInput, '5');

    // Wait for the error message to disappear and button to be enabled
    await waitFor(() => {
      expect(screen.queryByText('Number of guests must be between 1 and 10.')).not.toBeInTheDocument();
      expect(submitButton).toBeEnabled();
    });
  });

  test('calls submitForm with the correct data when the form is submitted', async () => {
    const user = userEvent.setup();
    const today = new Date().toISOString().split('T')[0];
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    );

    await user.selectOptions(screen.getByLabelText(/occasion/i), 'Anniversary');
    await user.click(screen.getByRole('button', { name: /make your reservation/i }));

    expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: today,
      time: '17:00', // First available time
      guests: 1, // Default number of guests
      occasion: 'Anniversary',
    });
  });
});