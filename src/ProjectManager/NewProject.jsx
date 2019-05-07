import React, { useState } from 'react';
import Button, { buttonContainer } from '../Button';
import { deserialize } from '../serde';
import template from '../template';

const steps = [
    ({ go, name, setName, cancel }) => (
        <React.Fragment>
            <h2 className="mt0">New Project</h2>
            <label className="ma2 db fw6 avenir dark-gray">Name:</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="pa2 ba b--moon-gray br2 db w5"
                type="text"
            />
            <div className={buttonContainer}>
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={go(1)}>Next</Button>
            </div>
        </React.Fragment>
    ),
    ({ go, template, setTemplate }) => (
        <React.Fragment>
            <h2 className="mt0">Import Template</h2>
            <textarea
                className="w-100 mw-100 h5 ba br2 b--moon-gray pa2"
                placeholder="Paste YAML or JSON here..."
                value={template}
                onChange={e => setTemplate(e.target.value)}
            />
            <div className={buttonContainer}>
                <Button onClick={go(0)}>Back</Button>
                <Button
                    disabled={template && !deserialize(template)}
                    onClick={go(2)}
                >
                    {template ? 'Next' : 'Skip'}
                </Button>
            </div>
        </React.Fragment>
    ),
    ({ go, confirm, name }) => (
        <React.Fragment>
            <h2 className="mt0">Confirm</h2>
            <strong>Name: </strong>
            {name}
            <div className={buttonContainer}>
                <Button onClick={go(1)}>Back</Button>
                <Button onClick={confirm}>Create</Button>
            </div>
        </React.Fragment>
    ),
];

const NewProject = props => {
    const { onCancel, onCreate } = props;
    const [name, setName] = useState('');
    const [imported, setImported] = useState('');
    const [step, setStep] = useState(0);
    return (
        <React.Fragment>
            {steps[step]({
                go: n => () => setStep(n),
                name,
                setName,
                template: imported,
                setTemplate: setImported,
                cancel: onCancel,
                confirm: () =>
                    onCreate(name, template.normalize(deserialize(imported))),
            })}
        </React.Fragment>
    );
};

export default NewProject;
