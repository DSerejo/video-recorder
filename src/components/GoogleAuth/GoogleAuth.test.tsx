import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleAuth from './GoogleAuth';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import { isSignedIn } from '../../auth/googleAuth';

jest.mock('../../hooks/useGoogleAuth');
jest.mock('../../auth/googleAuth');

describe('GoogleAuth Component', () => {
  const mockUseGoogleAuth = {
    initialized: true,
    handleSignIn: jest.fn(),
    handleSignOut: jest.fn(),
  };

  beforeEach(() => {
    (useGoogleAuth as jest.Mock).mockReturnValue(mockUseGoogleAuth);
    (isSignedIn as jest.Mock).mockReturnValue(false);
  });

  test('renders Sign in with Google button', () => {
    render(<GoogleAuth onAuthSuccess={jest.fn()} onAuthFailure={jest.fn()} />);
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  test('calls handleSignIn on button click', () => {
    render(<GoogleAuth onAuthSuccess={jest.fn()} onAuthFailure={jest.fn()} />);
    fireEvent.click(screen.getByText(/Sign in with Google/i));
    expect(mockUseGoogleAuth.handleSignIn).toHaveBeenCalled();
  });

  
});