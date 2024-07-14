import React from 'react';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import './GoogleAuth.css';
import { isSignedIn } from '../../auth/googleAuth';

const GoogleAuth: React.FC<{ onAuthSuccess: () => void, onAuthFailure: () => void }> = ({ onAuthSuccess, onAuthFailure }) => {
  const { initialized, handleSignIn, handleSignOut } = useGoogleAuth(onAuthSuccess, onAuthFailure);

  return (
    <div className="google-auth-container">
      {initialized && (
        <div>
          <button className="google-signin-button" onClick={handleSignIn}>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" width="20" height="20" />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;