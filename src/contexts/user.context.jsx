

import { setCurrentScreen } from 'firebase/analytics';
import { createContext, useState } from 'react';

// User info to access in different components

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


// Every context has a provider is a component that wraps up other components that need access to values inside.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}