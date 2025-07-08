import { updateTimes, initializeTimes } from './Main';
import { fetchAPI } from './api';

// Mock the fetchAPI function from the api module
jest.mock('./api', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

describe('Main component reducer functions', () => {
  // Clear mock history before each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeTimes', () => {
    it('should call fetchAPI with the current date and return its result', () => {
      const mockTimes = ['17:00', '18:00'];
      fetchAPI.mockReturnValue(mockTimes);

      const result = initializeTimes();

      // It should call fetchAPI once
      expect(fetchAPI).toHaveBeenCalledTimes(1);
      // The result should be what fetchAPI returned
      expect(result).toEqual(mockTimes);
    });
  });

  describe('updateTimes', () => {
    it('should return the same state if the action type is not UPDATE_TIMES', () => {
      const currentState = ['12:00', '13:00'];
      const action = { type: 'SOME_OTHER_ACTION' };
      const newState = updateTimes(currentState, action);
      expect(newState).toEqual(currentState);
    });

    it('should call fetchAPI with the new date and return the result for UPDATE_TIMES action', () => {
      const currentState = ['12:00', '13:00'];
      const newDate = '2024-10-20';
      const action = { type: 'UPDATE_TIMES', payload: newDate };
      const mockNewTimes = ['20:00', '21:00'];
      fetchAPI.mockReturnValue(mockNewTimes);

      const newState = updateTimes(currentState, action);
      expect(newState).toEqual(mockNewTimes);
    });
  });
});