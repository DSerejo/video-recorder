import { useState, useEffect } from 'react';
import { initClient, signIn, signOut, isSignedIn } from '../auth/googleAuth';
import { useAuth, useAuthDispatch } from '../context/AuthContext';

const useGoogleAuth = (onAuthSuccess: () => void, onAuthFailure: () => void) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [authPromise, setAuthPromise] = useState<Promise<any>>(new Promise((resolve, reject) => {}));
  const dispatch = useAuthDispatch();
  const {state: {client}} = useAuth();
  useEffect(() => {
    if (client) {
      return;
    }
    const { client: newClient, authPromise } = initClient();
    if (newClient) {
      dispatch({ type: "SET_CLIENT", payload: newClient });
    }
    setAuthPromise(authPromise);
    setInitialized(true);
    if (isSignedIn()) {
      onAuthSuccess();
    }
  }, [onAuthSuccess, client]);

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

  return { initialized, handleSignIn, handleSignOut };
};

export default useGoogleAuth;