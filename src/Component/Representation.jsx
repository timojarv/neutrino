import React, { useState, useMemo, useEffect } from 'react';
import Button from '../Button';

const hydrate = (template, vars) =>
    Object.keys(vars).reduce(
        (template, tag) =>
            template.replace(new RegExp('%' + tag + '%', 'g'), vars[tag]),
        template
    );

const Representation = ({ name, template, classes, editing, onEdit }) => {
    const [HTML, setHTML] = useState(template);

    useEffect(() => setHTML(template), [editing, template]);

    const data = useMemo(
        () => hydrate(template.replace('%class%', `%${name}%`), classes),
        [template, classes, name]
    );

    return editing ? (
        <div className="ph4 w-100 w-40-ns">
            <textarea
                className="w-100 pa2 mb2 ba br2 b--moon-gray code"
                value={HTML}
                onChange={e => setHTML(e.target.value)}
            />
            <Button onClick={() => onEdit(HTML)} className="fr">
                Confirm
            </Button>
            <Button onClick={() => onEdit(false)} className="fr">
                Cancel
            </Button>
        </div>
    ) : (
        <div
            className="ph4 pv3 w-100 w-40-ns tc tl-ns flex justify-center"
            dangerouslySetInnerHTML={{
                __html: data,
            }}
        />
    );
};

export default Representation;
