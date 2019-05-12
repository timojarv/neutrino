import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, Title } from '../base';
import { useUser } from '../util/hooks';
import { db } from '../util/firebase';

const List = styled.ul`
    list-style: none;
    padding-left: 0;
    font-family: 'avenir next', avenir, sans-serif;
`;

const Item = styled.li`
    a {
        color: #495057;
        font-weight: bold;
        text-decoration: none;
        font-size: 1.2em;
        line-height: 2;

        &:hover {
            color: #212529;
        }
    }
`;

const ProjectList = props => {
    const { user } = useUser();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        if (!user || !user.uid) {
            setProjects([]);
            return;
        }
        db.collection('projects')
            .where('owner', '==', user.uid)
            .get()
            .then(({ docs }) =>
                setProjects(docs.map(d => ({ id: d.id, ...d.data() })))
            );
    }, [user]);
    return (
        <React.Fragment>
            <Title>My Projects</Title>
            <List>
                {projects.map(project => (
                    <Item key={project.id}>
                        <Link to={`/${project.id}`}>{project.name}</Link>
                    </Item>
                ))}
            </List>
            <Button onClick={props.onClickCreate}>New Project</Button>
        </React.Fragment>
    );
};

export default ProjectList;
