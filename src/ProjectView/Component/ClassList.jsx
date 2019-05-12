import React from 'react';
import { Input } from '../../base';

const ClassList = ({ name, classes, onChange }) => (
    <React.Fragment>
        <label className="ma2 db fw6 avenir dark-gray">{name}:</label>
        <Input
            type="text"
            className="w-100"
            onChange={e => onChange(e.target.value)}
            value={classes[name] || ''}
        />
    </React.Fragment>
);

export default ClassList;
