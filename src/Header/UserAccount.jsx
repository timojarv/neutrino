import React from 'react';
import { useUser } from '../util/hooks';

import { Button } from '../base';

const UserAccount = props => {
    const { user, login, logout } = useUser();
    return (
        <React.Fragment>
            {user ? (
                <div>
                    <em style={{ marginRight: '1rem' }}>{user.email}</em>
                    <Button onClick={logout}>Log Out</Button>
                </div>
            ) : (
                <Button onClick={() => login()}>Log In</Button>
            )}
        </React.Fragment>
    );
};

export default UserAccount;
