import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Header from '../Header';
import { Button, Title, Modal } from '../base';
import { db } from '../util/firebase';
import Project from '../util/project';
import Component from './Component';
import EditTemplate from './EditTemplate';
import Export from './Export';
import Import from './Import';

const ProjectView = props => {
    const [project, setProject] = useState();
    useEffect(() => {
        db.collection('projects')
            .doc(props.match.params.id)
            .get()
            .then(doc => setProject(new Project(doc.id, doc.data())));
    }, []);
    useEffect(() => console.log(project), [project]);
    if (!project)
        return <Title style={{ textAlign: 'center' }}>Loading...</Title>;
    return (
        <React.Fragment>
            <Header>
                <div>
                    <strong>{project.name}</strong>
                    <Button style={{ marginLeft: '1rem' }}>Save</Button>
                </div>
                <Button as={Link} to={`/${props.match.params.id}/template`}>
                    Edit Template
                </Button>
                <div>
                    <Button as={Link} to={`/${props.match.params.id}/import`}>
                        Import Classes
                    </Button>
                    <Button as={Link} to={`/${props.match.params.id}/export`}>
                        Export Classes
                    </Button>
                </div>
            </Header>
            <div style={{ marginBottom: '2rem' }}>
                {project.template.map((component, i) => (
                    <Component
                        key={i}
                        classes={project.classes}
                        name={component.name}
                        template={component.data}
                    />
                ))}
            </div>
            <Route
                path="/:id/template"
                render={props => (
                    <Modal visible onClose={props.history.goBack}>
                        <EditTemplate />
                    </Modal>
                )}
            />
            <Route
                path="/:id/import"
                render={props => (
                    <Modal visible onClose={props.history.goBack}>
                        <Import
                            onImport={console.log}
                            onClose={props.history.goBack}
                        />
                    </Modal>
                )}
            />
            <Route
                path="/:id/export"
                render={props => (
                    <Modal visible onClose={props.history.goBack}>
                        <Export
                            onClose={props.history.goBack}
                            classes={project.classes}
                        />
                    </Modal>
                )}
            />
        </React.Fragment>
    );
};

export default ProjectView;
