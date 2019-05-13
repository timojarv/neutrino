import { deserialize, serializers, serialize } from './serde';

const emptyObjectDefault = (obj, def) => (!Object.keys(obj).length ? def : obj);

const template = {
    fromObject: obj =>
        obj
            ? Object.entries(obj).map(([name, data]) => ({
                  name,
                  data
              }))
            : [],
    normalize: obj => (Array.isArray(obj) ? obj : template.fromObject(obj)),
    toObject: arr =>
        arr.reduce((obj, c) => {
            obj[c.name] = c.data;
            return obj;
        }, {}),
    fromYAML: yaml => template.normalize(deserialize(yaml)),
    toYAML: obj =>
        serialize(
            emptyObjectDefault(template.toObject(obj), undefined),
            serializers.YAML
        )
};

export default template;
