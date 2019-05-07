import { useState, useCallback } from 'react';
import { auth, provider } from './firebase';
import { useSelector } from 'react-redux';

// useUser should give you the current user
export const useUser = () => {
    const [user = {}, setUser] = useState(auth.currentUser);
    auth.onAuthStateChanged(setUser);
    const login = useCallback(() => auth.signInWithRedirect(provider), []);
    const logout = useCallback(() => auth.signOut(), []);
    return { user, login, logout };
};

export const useCurrentProject = () => {
    return useSelector(state => state.projects[state.openedProject]);
};
