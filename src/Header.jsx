import React, { useState } from 'react';
import UserAccount from './UserAccount';
import Modal from './Modal';
import ProjectManager from './ProjectManager';

const Header = props => {
    const [open, setOpen] = useState(false);
    return (
        <header className="dark-gray avenir fixed z-5 top-0 w-100 overflow-x-auto bg-white tc ph4 pv1 pv3-ns flex items-center justify-between bb b--moon-gray mb4">
            <h1 className="mr4 f4 f3-ns">Neutrino</h1>
            <UserAccount setProjectManagerOpen={setOpen} />
            {open && (
                <Modal
                    className="w-80 mw6"
                    visible={open}
                    onClose={() => setOpen(false)}
                >
                    <ProjectManager {...props} />
                </Modal>
            )}
        </header>
    );
};

export default Header;
