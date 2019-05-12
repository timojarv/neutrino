import React, { useState } from 'react';
import styled from 'styled-components';
import { Title, ActionGroup, Button } from '../base';
import { serialize, serializers } from '../util/serde';

const Code = styled.pre`
    margin: 0;
    line-height: 1.5;
    max-height: 80vh;
    overflow: auto;
`;

const Top = styled.div`
    display: flex;
    align-items: flex-start;
`;

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const Export = props => {
    const [format, setFormat] = useState('YAML');
    const data = serialize(
        Object.entries(props.classes).reduce((acc, [k, v]) => {
            acc[k] = v || '';
            return acc;
        }, {}),
        serializers[format]
    );
    return (
        <React.Fragment>
            <Top>
                <Title style={{ marginRight: '2rem' }} as="h2">
                    Export
                </Title>
                <select
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                >
                    {Object.keys(serializers).map(ser => (
                        <option value={ser}>{ser}</option>
                    ))}
                </select>
            </Top>
            <Code>{data}</Code>
            <ActionGroup modal>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={() => copyToClipboard(data)}>
                    Copy to Clipboard
                </Button>
            </ActionGroup>
        </React.Fragment>
    );
};

export default Export;
