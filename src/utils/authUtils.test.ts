import { isTokenValid } from './authUtils';

describe('authUtils', () => {
  test('isTokenValid returns true if access_token is in localStorage', () => {
    localStorage.setItem('access_token', 'test_token');
    expect(isTokenValid()).toBe(true);
  });

  test('isTokenValid returns false if access_token is not in localStorage', () => {
    localStorage.removeItem('access_token');
    expect(isTokenValid()).toBe(false);
  });
});