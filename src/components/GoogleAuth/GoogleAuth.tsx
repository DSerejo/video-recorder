import React, { useState, useEffect } from 'react';
import { initClient, signIn, signOut, isSignedIn } from '../../auth/googleAuth';

const GoogleAuth: React.FC<{ onAuthSuccess: () => void, onAuthFailure: () => void }> = ({ onAuthSuccess, onAuthFailure }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [client, setClient] = useState<any>(null);
  const [authPromise, setAuthPromise] = useState<Promise<any>>(new Promise((resolve, reject) => {}));

  useEffect(() => {
    const {client, authPromise} = initClient();
    setClient(client);
    setAuthPromise(authPromise);
    setInitialized(true);
    if (isSignedIn()) {
      onAuthSuccess();
    }
    
  }, [onAuthSuccess]);

  const handleSignIn = () => {
    if (client) {
      signIn(client);
      authPromise.then(() => {
        onAuthSuccess();
      });
    }
  };

  const handleSignOut = () => {
    signOut();
    onAuthFailure();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {initialized && (
            <div>
              <button className="google-signin-button" onClick={handleSignIn}>
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" width="20" height="20" />
                Sign in with Google
              </button>
              {isSignedIn() && (
                <button className="btn btn-secondary mt-2" onClick={handleSignOut}>
                  Sign out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;