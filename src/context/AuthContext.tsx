import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { isSignedIn, signOut } from "../auth/googleAuth";

interface AuthState {
    isAuthenticated: boolean;
    client: google.accounts.oauth2.TokenClient | null;
    error: string | null;
}

type AuthAction =
    | { type: "LOGIN" }
    | { type: "LOGOUT" }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "SET_CLIENT"; payload: google.accounts.oauth2.TokenClient | null };

const initialState: AuthState = {
    isAuthenticated: false,
    client: null,
    error: null,
};

export const AuthContext = createContext({state: initialState});
export const AuthDispatchContext = createContext<React.Dispatch<AuthAction>>(() => {
    throw new Error("AuthDispatchContext must be used within an AuthProvider");
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, isAuthenticated: true, error: null };
        case "LOGOUT":
            signOut();
            return { ...state, isAuthenticated: false, error: null };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_CLIENT":
            return { ...state, client: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    return (
        <AuthContext.Provider value={{state}}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);   
export const useAuthDispatch = () => useContext(AuthDispatchContext);