import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Component from '../Component';
import { saveProject } from '../actions';

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
    const project = useSelector(state => state.projects[state.openedProject]);
    const dispatch = useDispatch();
    const debouncedSave = useRef(debounce(() => dispatch(saveProject()), 1000));
    useEffect(() => debouncedSave.current(), [project]);
    return (
        <main className="sans-serif mt6">
            {project ? (
                project.template.map(({ name, data }) => (
                    <Component
                        classes={project.classes}
                        name={name}
                        template={data}
                    />
                ))
            ) : (
                <h2>No project opened.</h2>
            )}
        </main>
    );
};

export default ProjectView;
