import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button, { buttonContainer } from '../Button';
import { openProject, deleteProject } from '../actions';

const ProjectList = props => {
    const { onClickCreate } = props;
    const activeProject = useSelector(state => state.activeProject);
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();
    const setActiveProject = id => dispatch(openProject(id));
    return (
        <React.Fragment>
            <h2 className="mt0">My Projects</h2>
            <ul className="list pl0">
                {Object.entries(projects).map(([id, project]) => (
                    <li
                        key={id}
                        className="hide-child hover-gray flex items-center justify-between"
                    >
                        <span
                            className={
                                'pointer fw5 f4 flex-auto ' +
                                (id === activeProject ? 'fw6 dark-blue' : '')
                            }
                        >
                            {project.name}
                        </span>
                        {id !== activeProject && (
                            <Button
                                onClick={() => setActiveProject(id)}
                                className="child"
                            >
                                Open
                            </Button>
                        )}
                        <Button
                            className="child"
                            onClick={() =>
                                window.confirm('Are you sure?') &&
                                dispatch(deleteProject(id))
                            }
                            color="red"
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
            <div className={buttonContainer}>
                <Button onClick={onClickCreate}>Create New</Button>
            </div>
        </React.Fragment>
    );
};

export default ProjectList;
