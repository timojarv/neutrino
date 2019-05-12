import React, { useState } from 'react';
import styled from 'styled-components';
import { Title, ActionGroup, Button } from '../base';
import { deserialize } from '../util/serde';

const Textarea = styled.textarea`
    margin: 0;
    line-height: 1.5;
    max-height: 80vh;
    overflow: auto;
    width: 800px;
    height: 500px;
    border-radius: 0.25rem;
    resize: vertical;
    padding: 4px;
    border: 1px solid #dee2e6;
    font-family: monospace;
`;

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
