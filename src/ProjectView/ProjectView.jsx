import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Component from '../Component';
import { saveProject, updateTemplate, updateClasses } from '../actions';
import { useCurrentProject } from '../hooks';
import Button from '../Button';

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const ProjectView = props => {
    const project = useCurrentProject();
    const dispatch = useDispatch();
    const debouncedSave = useRef(debounce(() => dispatch(saveProject()), 1000));
    useEffect(() => debouncedSave.current(), [project]);
    const remove = name => () => {
        dispatch(updateTemplate(project.template.filter(v => v.name !== name)));
    };
    const update = name => ({ template, classes }) => {
        if (template !== undefined) {
            dispatch(
                updateTemplate(
                    project.template.map(c =>
                        c.name === name ? { ...c, data: template } : c
                    )
                )
            );
        }

        if (classes !== undefined) {
            dispatch(updateClasses({ ...project.classes, [name]: classes }));
        }
    };
    const insertAfter = name => () => {
        dispatch(
            updateTemplate(
                project.template.reduce(
                    (nt, c) => {
                        nt.push(c);
                        if (c.name === name)
                            nt.push({ name: 'newComponent', data: '' });
                        return nt;
                    },
                    name === null ? [{ name: 'newComponent', data: '' }] : []
                )
            )
        );
    };
    return (
        <main className="sans-serif mt6 mb5">
            {project ? (
                <React.Fragment>
                    {project.template.length === 0 && (
                        <div className="tc">
                            <h2 className="normal dark-gray">No Components</h2>
                            <Button onClick={insertAfter(null)}>
                                Create New
                            </Button>
                        </div>
                    )}
                    {project.template.map(({ name, data }, i) => (
                        <Component
                            key={i}
                            classes={project.classes}
                            name={name}
                            template={data}
                            remove={remove(name)}
                            update={update(name)}
                            insert={insertAfter(name)}
                            insertBefore={
                                i === 0 ? insertAfter(null) : undefined
                            }
                        />
                    ))}
                </React.Fragment>
            ) : (
                <h2 className="tc normal dark-gray">No project opened.</h2>
            )}
        </main>
    );
};

export default ProjectView;
