import React from 'react';
import { Route, Link } from 'react-router-dom';
import Header from '../Header';
import { Button, Title, Modal } from '../base';
import useProject from '../util/project';
import Component from './Component';
import EditTemplate from './EditTemplate';
import Export from './Export';
import Import from './Import';

const ProjectView = props => {
    const project = useProject(props.match.params.id);
    const template = (project && project.template) || [];
    if (!project || project.loading)
        return <Title style={{ textAlign: 'center' }}>Loading...</Title>;
    return (
        <React.Fragment>
            <Header>
                <div>
                    <strong>
                        {!project.saved ? (
                            <em>{project.name}*</em>
                        ) : (
                            project.name
                        )}
                    </strong>
                    <Button
                        onClick={project.save}
                        style={{ marginLeft: '1rem' }}
                    >
                        Save
                    </Button>
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
                <Component
                    classes={project.classes}
                    setClasses={project.setClasses}
                    name="global"
                />
                {template.map((component, i) => (
                    <Component
                        key={i}
                        classes={project.classes}
                        setClasses={project.setClasses}
                        name={component.name}
                        template={component.data}
                    />
                ))}
            </div>
            <Route
                path="/:id/template"
                render={props => (
                    <Modal visible onClose={props.history.goBack}>
                        <EditTemplate
                            template={template}
                            onClose={props.history.goBack}
                            onUpdate={template => {
                                project.setTemplate(template);
                                props.history.goBack();
                            }}
                        />
                    </Modal>
                )}
            />
            <Route
                path="/:id/import"
                render={props => (
                    <Modal visible onClose={props.history.goBack}>
                        <Import
                            onImport={classes => {
                                project.setClasses(classes);
                                props.history.goBack();
                            }}
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
