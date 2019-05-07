import { deserialize } from './serde';
import { db } from './firebase';

export default class Project {
    id = null;
    template = [];
    classes = new WeakMap();

    constructor(id, template, classes) {
        super();
        this.id = id;
        let parsed = deserialize(template);
        if (parsed) {
            this.template = templateUtils.normalize(parsed);
        }

        parsed = deserialize(classes);
        if (parsed) {
            this.classes = new WeakMap(
                this.template.map(c => [c, parsed[c.name]])
            );
        }
    }

    save() {
        const template = JSON.stringify(this.template);
        const classes = this.template.reduce((cls, c) => {
            cls[c.name] = this.classes.get(c);
        }, {});

        return db
            .collection('projects')
            .doc(this.id)
            .update({ template, classes });
    }

    remove() {
        return db
            .collection('projects')
            .doc(this.id)
            .delete();
    }

    insertComponent(index) {}
}

const templateUtils = {
    fromObject: obj =>
        Object.entries(obj).map(([name, data]) => ({
            name,
            data,
        })),
    normalize: obj =>
        Array.isArray(obj) ? obj : templateUtils.fromObject(obj),
};
