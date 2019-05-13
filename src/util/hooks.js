import { useState, useCallback, useLayoutEffect } from 'react';
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

export const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        // Get original body overflow

        const originalStyle = window.getComputedStyle(document.body).overflow;

        // Prevent scrolling on mount

        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts

        return () => (document.body.style.overflow = originalStyle);
    }, []); // Empty array ensures effect is only run on mount and unmount
};
