import YAML from 'yaml';

const isObject = obj => typeof obj === 'object';

export const deserialize = (str, constraint = isObject) => {
    let result = false;
    try {
        result = JSON.parse(str);
    } catch (_) {}
    try {
        result = YAML.parse(str);
    } catch (_) {}
    return constraint(result) ? result : null;
};

export const serialize = (obj, serializer) => {
    return serializer.stringify(obj, true, 2);
};

export const ELM = {
    stringify: obj =>
        Object.keys(obj)
            .map(
                n => `${n} : Attribute msg\n${n} =\n    class "${obj[n]}"\n\n\n`
            )
            .reduce((def, elm) => elm + def, '')
};

export const JS = {
    stringify: obj =>
        'const classes = {\n' +
        Object.entries(obj).reduce(
            (res, [k, v]) => `${res}  ${k}: '${v}',\n`,
            ''
        ) +
        '};'
};

export const serializers = {
    JSON: JSON,
    YAML: YAML,
    Elm: ELM,
    JavaScript: JS
};
