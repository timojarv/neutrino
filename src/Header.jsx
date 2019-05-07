import React, { useState, useEffect } from 'react';
import UserAccount from './UserAccount';
import Modal from './Modal';
import ProjectManager from './ProjectManager';
import { useUser, useCurrentProject } from './hooks';

const Header = props => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const project = useCurrentProject();
    useEffect(() => {
        if (!user) setOpen(false);
    }, [user]);
    return (
        <header className="dark-gray avenir fixed z-5 top-0 w-100 overflow-x-auto bg-white tc ph4 pv1 pv3-ns flex items-center justify-between bb b--moon-gray mb4">
            <h1 className="mr4 f4 f3-ns">Neutrino</h1>
            <span>
                {project && project.name}&nbsp;&nbsp;
                <em className="gray">
                    {project && (project.saved ? 'Saved' : '')}
                </em>
            </span>
            <UserAccount setProjectManagerOpen={setOpen} />
            {open && (
                <Modal
                    className="w-80 mw6"
                    visible={open}
                    onClose={() => setOpen(false)}
                >
                    <ProjectManager onClose={() => setOpen(false)} {...props} />
                </Modal>
            )}
        </header>
    );
};

export default Header;
