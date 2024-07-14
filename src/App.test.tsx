import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { isTokenValid } from './utils/authUtils';
import { initClient, signOut } from './auth/googleAuth';

// Mock the auth utilities
jest.mock('./utils/authUtils');
jest.mock('./auth/googleAuth');

describe('App Component', () => {
  beforeEach(() => {
    (isTokenValid as jest.Mock).mockReturnValue(false);
    (initClient as jest.Mock).mockReturnValue({
      client: {},
      authPromise: Promise.resolve()
    });
  });

  test('renders GoogleAuth component when not authenticated', () => {
    render(<App />);
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  // test('renders VideoRecorder component when authenticated', () => {
  //   (isTokenValid as jest.Mock).mockReturnValue(true);
  //   render(<App />);
  //   expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  // });

  // test('signs out when Sign out button is clicked', () => {
  //   (isTokenValid as jest.Mock).mockReturnValue(true);
  //   render(<App />);
  //   fireEvent.click(screen.getByText(/Sign out/i));
  //   expect(signOut).toHaveBeenCalled();
  //   expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  // });
});