import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Header';
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

    const handleCreate = name => {
        if (!user || !user.uid) return;
        db.collection('projects')
            .add({
                owner: user.uid,
                name,
                template: '',
                classes: '',
                created: Date.now(),
            })
            .then(() => setCreating(false));
    };

    return (
        <React.Fragment>
            <Header />
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
        </React.Fragment>
    );
};

export default ProjectManager;
