import React, { useState } from 'react';
import { Title, CodeEditor, ActionGroup, Button } from '../base';
import template from '../util/template';

const EditTemplate = props => {
    const { onUpdate } = props;
    const [data, setData] = useState(template.toYAML(props.template));
    const handleUpdate = () => {
        onUpdate(template.fromYAML(data));
    };
    return (
        <React.Fragment>
            <Title as="h2">Edit Template (YAML)</Title>
            <CodeEditor
                placeholder="Edit here..."
                value={data}
                onChange={setData}
                width="80vw"
                style={{ maxWidth: 800 }}
            />
            <ActionGroup modal>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Confirm</Button>
            </ActionGroup>
        </React.Fragment>
    );
};

export default EditTemplate;
