import React, { useMemo } from 'react';

const hydrate = (template, vars) =>
    Object.keys(vars).reduce(
        (template, tag) =>
            template.replace(new RegExp('%' + tag + '%', 'g'), vars[tag]),
        template
    );

const Representation = ({ name, template, classes }) => {
    const data = useMemo(
        () => hydrate(template.replace('%class%', `%${name}%`), classes),
        [template, classes, name]
    );

    return (
        <div
            className={
                'ph4 pv3 w-100 w-40-ns tc tl-ns flex justify-center ' +
                classes.global
            }
            dangerouslySetInnerHTML={{
                __html: data,
            }}
        />
    );
};

export default Representation;
