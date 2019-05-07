import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import NewProject from './NewProject';
import ProjectList from './ProjectList';
import { createProject } from '../actions';

const ProjectManager = props => {
    const [creating, setCreating] = useState(false);
    const dispatch = useDispatch();

    return creating ? (
        <NewProject
            onCreate={(name, template, classes) =>
                dispatch(createProject(name, template, classes)).then(() =>
                    setCreating(false)
                )
            }
            onCancel={() => setCreating(false)}
        />
    ) : (
        <ProjectList onClickCreate={() => setCreating(true)} />
    );
};

export default ProjectManager;
