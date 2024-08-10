import React, {createContext, useContext, useEffect} from "react";
import {LOGGED_OUT_ROLE, NO_EMAIL, NO_TOKEN} from "../utils.ts";
import useSessionStoragee from "./useSessionStorage.hook.ts";

interface UserContextType {
    token: string,
    setToken: (token: string) => void,
    role: string,
    setRole: (role: string) => void;
    email: string,
    setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextType>({
    token: NO_TOKEN,
    setToken: () => {
    },
    role: LOGGED_OUT_ROLE,
    setRole: () => {
    },
    email: NO_EMAIL,
    setEmail: () => {
    }
});

export const UserContextProvider = ({children}: React.PropsWithChildren) => {
    const [token, setToken] = useSessionStoragee<string>('token', NO_TOKEN, String);
    const [role, setRole] = useSessionStoragee<string>('userRole', LOGGED_OUT_ROLE, String);
    const [email, setEmail] = useSessionStoragee<string>('userEmail', NO_EMAIL, String);


    useEffect(() => {
        console.log('Token Updated', token);
        console.log('Role Updated', role);
        console.log('Email Updated', email);

    }, [token, role, email]);

    return (
        <UserContext.Provider value={{token, setToken, role, setRole, email, setEmail}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a userContextProvider');
    }
    return context;
}

