import React, { useState } from 'react';
import styled from 'styled-components';

import NewProject from './NewProject';
import ProjectList from './ProjectList';
import { db } from '../util/firebase';
import { useUser } from '../util/hooks';

const Container = styled.section`
    text-align: center;
    margin: auto;
    max-width: 400px;
    width: 80%;
`;

const ProjectManager = props => {
    const [creating, setCreating] = useState(false);
    const { user } = useUser();

    const handleCreate = (name, template) => {
        if (!user || !user.uid) return;
        db.collection('projects')
            .add({
                owner: user.uid,
                name,
                template: template || '',
                classes: '',
                created: Date.now()
            })
            .then(() => setCreating(false));
    };

    return (
        <Container>
            {creating ? (
                <NewProject
                    onCreate={handleCreate}
                    onCancel={() => setCreating(false)}
                />
            ) : (
                <ProjectList onClickCreate={() => setCreating(true)} />
            )}
        </Container>
    );
};

export default ProjectManager;
