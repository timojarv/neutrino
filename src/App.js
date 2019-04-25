import React, { useState, useCallback, useEffect } from 'react';

const defaultTemplate = {
    button: "<button class='%class%' >Button</button>",
    buttonDanger: "<button class='%class%' >Button Danger</button>",
    link: "<a href='#' class='%class%' >Link</a>",
    linkDanger: "<a href='#' class='%class%' >Link Danger</a>",
    input: "<input class='%class%'  placeholder='input' />",
    title1: "<h1 class='%class%' >Title 1</h1>",
    title2: "<h2 class='%class%' >Title 2</h2>",
    title3: "<h3 class='%class%' >Title 3</h3>",
    textarea: "<textarea class='%class%'>Text area</textarea>",
};

const btn =
    ' mr3 b br2 bn blue pa2 bg-white hover-bg-lightest-blue pointer nowrap ';
const input = ' ba br1 b--moon-gray flex-auto code pa2 ';

const render = (template, vars) =>
    Object.keys(vars).reduce(
        (template, tag) =>
            template.replace(new RegExp('%' + tag + '%', 'g'), vars[tag]),
        template
    );

const Component = props => {
    const { name, setClasses, template } = props;
    const classes = props.classes || '';
    return (
        <article className="w-100 flex items-center">
            <div
                className="ph4 pv3 w-100 w-40-ns tc tl-ns flex justify-center"
                dangerouslySetInnerHTML={{
                    __html: render(
                        template.replace('%class%', `%${name}%`),
                        classes
                    ),
                }}
            />
            <div className="ph4 pv3 dn w-60 db-ns bl b--moon-gray code self-stretch">
                <label className="mr3 db tl mb2">{name}:</label>
                <input
                    type="text"
                    className={input + 'w-100'}
                    onChange={e => setClasses(e.target.value)}
                    value={classes[name]}
                />
            </div>
        </article>
    );
};

const elmify = classes =>
    Object.keys(classes)
        .map(
            n => `${n} : Attribute msg\n${n} =\n    class "${classes[n]}"\n\n\n`
        )
        .reduce((def, elm) => elm + def, '');

function App() {
    const [classes, setClasses] = useState(
        JSON.parse(localStorage.getItem('kitchensink_styles') || '{}')
    );
    const [output, setOutput] = useState('');
    const [template, setTemplate] = useState(
        JSON.parse(localStorage.getItem('kitchensink_template')) ||
            defaultTemplate
    );
    const setter = useCallback(n => v => setClasses({ ...classes, [n]: v }), [
        setClasses,
        classes,
    ]);
    useEffect(() => {
        localStorage.setItem('kitchensink_styles', JSON.stringify(classes));
    }, [classes]);
    useEffect(() => {
        localStorage.setItem('kitchensink_template', JSON.stringify(template));
    }, [template]);

    return (
        <React.Fragment>
            <header className="fixed top-0 w-100 overflow-x-auto bg-white code tc ph4 pv1 pv3-ns flex items-center justify-between bb b--moon-gray mb4">
                <h1 className="mr4 f4 f3-ns">Neutrino</h1>
                <label className="mr3 dn di-ns nowrap">
                    global:
                    <input
                        type="text"
                        value={classes.global || ''}
                        onChange={e => setter('global')(e.target.value)}
                        className={input + ' w5 ml3'}
                    />
                </label>
                <button
                    onClick={() => setTemplate(JSON.parse(output))}
                    className={btn}
                >
                    &uarr; Template
                </button>
                <button
                    onClick={() => setOutput(JSON.stringify(template, true, 2))}
                    className={btn}
                >
                    Template &darr;
                </button>
                <button
                    onClick={() => setClasses(JSON.parse(output))}
                    className={btn}
                >
                    &uarr; Styles
                </button>
                <button
                    onClick={() => setOutput(JSON.stringify(classes, true, 2))}
                    className={btn}
                >
                    Styles &darr;
                </button>
                <button
                    onClick={() => setOutput(elmify(classes))}
                    className={btn}
                >
                    Elm &darr;
                </button>
                <button className={btn}>Import</button>
                <button className={btn}>Export</button>
                <button className={btn}>Save</button>
            </header>
            <main className={'mt6 ' + classes.global}>
                {Object.entries(template).map(([n, t], i) => (
                    <Component
                        key={i}
                        name={n}
                        classes={classes}
                        setClasses={setter(n)}
                        template={t}
                    />
                ))}
            </main>
            <footer className="pa4">
                <textarea
                    spellCheck={false}
                    style={{ resize: 'none' }}
                    onChange={e => setOutput(e.target.value)}
                    className="code pa2 w-100 br1 ba b--moon-gray h5 overflow-y-auto"
                    value={output}
                />
            </footer>
        </React.Fragment>
    );
}

export default App;
