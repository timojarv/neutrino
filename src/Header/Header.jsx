import React from 'react';
import { Link } from 'react-router-dom';
import UserAccount from './UserAccount';
import { Title } from '../base';

const Header = props => {
    return (
        <header className="dark-gray avenir fixed z-5 top-0 w-100 overflow-x-auto bg-white tc ph4 pv1 pv3-ns flex items-center justify-between bb b--moon-gray mb4">
            <Title style={{ marginTop: '1rem' }} as="h2">
                <Link to="/">Neutrino</Link>
            </Title>
            {props.children}
            <UserAccount />
        </header>
    );
};

export default Header;
