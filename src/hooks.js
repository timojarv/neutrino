import {
    useState,
    useCallback,
    useEffect,
    useMemo,
    useContext,
    useRef,
} from 'react';
import { auth, db, provider } from './firebase';

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// useUser should give you the current user
export const useUser = () => {
    const [user = {}, setUser] = useState(auth.currentUser);
    auth.onAuthStateChanged(setUser);
    const login = useCallback(() => auth.signInWithRedirect(provider), []);
    const logout = useCallback(() => auth.signOut(), []);
    return { user, login, logout };
};
