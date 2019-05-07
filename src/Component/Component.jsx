import React, { useState } from 'react';
import { AddButton, EditButton, DeleteButton } from '../Button';
import Representation from './Representation';
import ClassList from './ClassList';

const Component = props => {
    const { name, template, classes, remove, update, insert } = props;
    const [editing, setEditing] = useState(false);
    return (
        <article className="w-100 flex items-center">
            <Representation
                name={name}
                template={template}
                classes={classes}
                editing={editing}
                onEdit={template => {
                    update({ template });
                    setEditing(false);
                }}
            />
            <div className="ph4 pv3 dn w-60 db-ns bl b--moon-gray self-stretch relative">
                <div className="absolute left-0 nl3 hide-child mt2">
                    <EditButton
                        onClick={() => setEditing(!editing)}
                        className="db child"
                    />
                    <DeleteButton onClick={remove} className="db mt2 child" />
                </div>
                <AddButton
                    onClick={insert}
                    className="absolute left-0 nl2 bottom-0 nb3"
                />
                <ClassList
                    name={name}
                    classes={classes}
                    onChange={classes => update({ classes })}
                />
            </div>
        </article>
    );
};

export default Component;
