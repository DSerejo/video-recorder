import credentials from '../config/credentials.json';

const { client_id } = credentials.web;

export const initClient = () => {
    let promiseResolve: (value: unknown) => void;
    let promiseReject: (reason: unknown) => void;
    const authPromise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    const client = google.accounts.oauth2.initTokenClient({
        client_id: client_id,
        scope: 'https://www.googleapis.com/auth/drive.file',
        callback: (response) => {
            if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                promiseResolve(client);
            } else {
                promiseReject('No access token received');
            }
        },
    });
    return {client, authPromise};

};

export const signIn = (client: google.accounts.TokenClient) => {
    client.requestAccessToken();
};

export const signOut = () => {
    localStorage.removeItem('access_token');
};

export const isSignedIn = () => {
    return !!localStorage.getItem('access_token');
};