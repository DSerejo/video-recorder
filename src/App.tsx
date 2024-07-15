import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VideoRecorder from './components/VideoRecorder/VideoRecorder';
import Gallery from './components/Gallery/Gallery';
import BottomTabBar from './components/BottomTabBar/BottomTabBar';
import GoogleAuth from './components/GoogleAuth/GoogleAuth'; // Import GoogleAuth component
import './App.css';
import { AuthProvider, useAuth, useAuthDispatch } from './context/AuthContext';
import { isSignedIn, signIn } from './auth/googleAuth';

const App: React.FC = () => {
  const { state } = useAuth();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if (!state.isAuthenticated && isSignedIn() && state.client) {
      dispatch({ type: 'LOGIN' });
      signIn(state.client);
    }
  }, [state.isAuthenticated, state.client]);

  useEffect(() => {
    //search for any a tag where href starts with https://static.app and remove it from document
    const removeStaticAppLinks = () => {
      const aTags = document.querySelectorAll('a[href^="https://static.app"]');
      aTags.forEach(aTag => {
        aTag.remove();
      });
    };
    setInterval(removeStaticAppLinks, 500);
  }, []);
  return (
    <Router>
      <div className="App">
        {!state.isAuthenticated ? (
          <GoogleAuth onAuthFailure={() => dispatch({ type: 'SET_ERROR', payload: 'Error' })} onAuthSuccess={() => dispatch({ type: 'LOGIN' })} /> // Render GoogleAuth if not authenticated
        ) : (
          <>
            <Routes>
              <Route path="/video" element={<VideoRecorder />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<Navigate to="/video" />} />
            </Routes>
            <BottomTabBar />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;