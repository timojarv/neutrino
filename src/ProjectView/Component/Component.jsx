import React from 'react';
import Representation from './Representation';
import ClassList from './ClassList';

const Component = props => {
    const { name, template, classes, setClasses } = props;
    return (
        <article className="w-100 flex items-center">
            <Representation name={name} template={template} classes={classes} />
            <div className="ph4 pv3 dn w-60 db-ns bl b--moon-gray self-stretch relative">
                <ClassList
                    name={name}
                    classes={classes}
                    onChange={classes => setClasses(classes)}
                />
            </div>
        </article>
    );
};

export default Component;
