import { initClient, signIn, signOut, isSignedIn } from './googleAuth';
const mockGoogle: any = {
  accounts: {
    oauth2: {
      initTokenClient: jest.fn().mockReturnValue({
        requestAccessToken: jest.fn(),
      }),
    },
  },
};

global.google = mockGoogle;

describe('googleAuth', () => {
  test('initClient initializes client and returns authPromise', () => {
    const { client, authPromise } = initClient();
    expect(client).toBeDefined();
    expect(authPromise).toBeInstanceOf(Promise);
  });

  test('signIn calls requestAccessToken on client', () => {
    const client = { requestAccessToken: jest.fn() };
    signIn(client);
    expect(client.requestAccessToken).toHaveBeenCalled();
  });

  test('signOut removes access_token from localStorage', () => {
    localStorage.setItem('access_token', 'test_token');
    signOut();
    expect(localStorage.getItem('access_token')).toBeNull();
  });

  test('isSignedIn returns true if access_token is in localStorage', () => {
    localStorage.setItem('access_token', 'test_token');
    expect(isSignedIn()).toBe(true);
  });

  test('isSignedIn returns false if access_token is not in localStorage', () => {
    localStorage.removeItem('access_token');
    expect(isSignedIn()).toBe(false);
  });
});