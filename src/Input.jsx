import React from 'react';

const Input = ({ className, ...other }) => (
    <input
        {...other}
        className={'ba br2 b--moon-gray flex-auto code pa2 ' + className}
    />
);

export default Input;
