import React, { useState } from 'react';
import { Title, ActionGroup, Button, Textarea } from '../base';
import { deserialize } from '../util/serde';

const Import = props => {
    const [data, setData] = useState('');

    const handleImport = () => {
        const parsed = deserialize(data);
        if (parsed) props.onImport(parsed);
    };
    return (
        <React.Fragment>
            <Title style={{ marginRight: '2rem' }} as="h2">
                Import Classes (JSON/YAML)
            </Title>
            <Textarea
                placeholder="Paste here..."
                value={data}
                onChange={e => setData(e.target.value)}
            />
            <ActionGroup modal>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleImport}>Import</Button>
            </ActionGroup>
        </React.Fragment>
    );
};

export default Import;
