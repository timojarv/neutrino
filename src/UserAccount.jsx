import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import { useUser } from './hooks';
import { fetchProjects } from './actions';

const UserAccount = props => {
    const { user, login, logout } = useUser();
    const dispatch = useDispatch();
    useEffect(() => {
        user && user.uid && dispatch(fetchProjects());
    }, [user, dispatch]);
    return (
        <React.Fragment>
            {user ? (
                <div>
                    <Button
                        title={user.uid}
                        onClick={() => props.setProjectManagerOpen(true)}
                    >
                        {user.email}
                    </Button>
                    <Button onClick={logout}>Log Out</Button>
                </div>
            ) : (
                <Button onClick={() => login()}>Log In</Button>
            )}
        </React.Fragment>
    );
};

export default UserAccount;
