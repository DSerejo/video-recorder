import { renderHook, act, waitFor } from '@testing-library/react';
import useGoogleAuth from './useGoogleAuth';
import { initClient, signIn, signOut, isSignedIn } from '../auth/googleAuth';

jest.mock('../auth/googleAuth');

describe('useGoogleAuth Hook', () => {
    const mockInitClient = {
        client: {},
        authPromise: Promise.resolve(),
    };

    const onAuthSuccess = jest.fn();
    const onAuthFailure = jest.fn();

    beforeEach(() => {
        (initClient as jest.Mock).mockReturnValue(mockInitClient);
        (isSignedIn as jest.Mock).mockReturnValue(false);
    });

    test('initializes correctly', async () => {
        const { result } = renderHook(() => useGoogleAuth(onAuthSuccess, onAuthFailure));

        await waitFor(() => {
            expect(result.current.initialized).toBe(true);
        });

        expect(result.current.handleSignIn).toBeInstanceOf(Function);
        expect(result.current.handleSignOut).toBeInstanceOf(Function);
    });

    test('calls onAuthSuccess if already signed in', async () => {
        (isSignedIn as jest.Mock).mockReturnValue(true);
        renderHook(() => useGoogleAuth(onAuthSuccess, onAuthFailure));

        expect(onAuthSuccess).toHaveBeenCalled();
    });

    test('handleSignIn calls signIn and onAuthSuccess', async () => {
        const { result } = renderHook(() => useGoogleAuth(onAuthSuccess, onAuthFailure));

        await waitFor(() => {
            expect(result.current.initialized).toBe(true);
        });

        act(() => {
            result.current.handleSignIn();
        });

        expect(signIn).toHaveBeenCalledWith(mockInitClient.client);
        await act(() => mockInitClient.authPromise);
        expect(onAuthSuccess).toHaveBeenCalled();
    });

    test('handleSignOut calls signOut and onAuthFailure', () => {
        const { result } = renderHook(() => useGoogleAuth(onAuthSuccess, onAuthFailure));

        act(() => {
            result.current.handleSignOut();
        });

        expect(signOut).toHaveBeenCalled();
        expect(onAuthFailure).toHaveBeenCalled();
    });
});