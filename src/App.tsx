import React, { useState, useEffect } from 'react';
import './App.css';
import VideoRecorder from './components/VideoRecorder/VideoRecorder';
import GoogleAuth from './components/GoogleAuth/GoogleAuth';
import { isTokenValid } from './utils/authUtils';
import { signOut } from './auth/googleAuth';

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (isTokenValid()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleAuthFailure = () => {
    setIsAuthenticated(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Video Recorder App</h1>
      </header> */}
      <main className="App-main">
        {isAuthenticated ? (
          <>
            <VideoRecorder />
            <button className="btn btn-secondary mt-2" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <GoogleAuth onAuthSuccess={handleAuthSuccess} onAuthFailure={handleAuthFailure} />
        )}
      </main>
    </div>
  );
}

export default App;