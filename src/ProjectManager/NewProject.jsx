import React, { useState } from 'react';
import YAML from 'yaml';

import { Input, Button, Title, ActionGroup } from '../base';
import template from '../util/template';

const defaultTemplate = JSON.stringify(
    template.normalize(
        YAML.parse(`
button: <button class='%class%' >Button</button>
buttonIcon: <button class='%class%'><svg class='feather feather-settings sc-dnqmqq jxshSx'
  xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'
  fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'
  stroke-linejoin='round' aria-hidden='true' data-reactid='1066'><circle cx='12'
  cy='12' r='3'></circle><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0
  0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0
  0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65
  0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0
  0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
  0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83
  0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
  0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0
  1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0
  1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51
  1z'></path></svg></button>
link: <a href='#' class='%class%' >Link</a>
input: <input class='%class%'  placeholder='Type here ...' />
title: <h1 class='%class%' >This is a title</h1>
textarea: <textarea class='%class%'>Textarea content</textarea>
ruler: <hr class='%class%' />
copy: <p class='%class%'>Cupcake ipsum dolor sit. Amet carrot cake
  <strong>gingerbread</strong> marshmallow muffin I love gummies marzipan.
  Croissant halvah tiramisu chocolate bar brownie I love sesame snaps I love
  soufflé. Jujubes tootsie roll gummies toffee carrot cake lollipop cake pudding
  I love. Tootsie roll I love <em>danish macaroon cookie jelly</em> apple pie
  lollipop.</p>
dropdown: <select
  class='%class%'><option>Primary</option><option>Secondary</option></select>
        `)
    )
);

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
                <Button onClick={() => onCreate(name, defaultTemplate)}>
                    Confirm
                </Button>
            </ActionGroup>
        </React.Fragment>
    );
};

export default NewProject;
