import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleAuth from './GoogleAuth';
import { initClient, signIn, signOut, isSignedIn } from '../../auth/googleAuth';

jest.mock('../../auth/googleAuth');

describe('GoogleAuth Component', () => {
  beforeEach(() => {
    (initClient as jest.Mock).mockReturnValue({
      client: {},
      authPromise: Promise.resolve()
    });
    (isSignedIn as jest.Mock).mockReturnValue(false);
  });

  test('renders Sign in with Google button', () => {
    render(<GoogleAuth onAuthSuccess={jest.fn()} onAuthFailure={jest.fn()} />);
    expect(screen.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  test('calls signIn on button click', () => {
    render(<GoogleAuth onAuthSuccess={jest.fn()} onAuthFailure={jest.fn()} />);
    fireEvent.click(screen.getByText(/Sign in with Google/i));
    expect(signIn).toHaveBeenCalled();
  });

  test('calls signOut on button click when signed in', () => {
    (isSignedIn as jest.Mock).mockReturnValue(true);
    render(<GoogleAuth onAuthSuccess={jest.fn()} onAuthFailure={jest.fn()} />);
    fireEvent.click(screen.getByText(/Sign out/i));
    expect(signOut).toHaveBeenCalled();
  });
});