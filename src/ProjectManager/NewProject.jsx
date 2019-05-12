import React, { useState } from 'react';
import { Input, Button, Title, ActionGroup } from '../base';

const NewProject = props => {
    const { onCancel, onCreate } = props;
    const [name, setName] = useState('');
    return (
        <React.Fragment>
            <Title>New Project</Title>
            <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
            />
            <ActionGroup style={{ maxWidth: 200 }}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onCreate(name)}>Confirm</Button>
            </ActionGroup>
        </React.Fragment>
    );
};

export default NewProject;
