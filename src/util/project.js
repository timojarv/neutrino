import { useRef, useState } from 'react';

import { deserialize } from './serde';
import { db } from './firebase';

export default class Project {
    name = '';
    id = null;
    template = [];
    classes = {};

    constructor(id, data) {
        const { classes, template, name } = data;
        this.name = name;
        this.id = id;
        let parsed = deserialize(template);
        if (parsed) {
            this.template = templateUtils.normalize(parsed);
        }

        parsed = deserialize(classes);
        if (parsed) {
            this.template.forEach(
                ({ name }) => (this.classes[name] = parsed[name])
            );
        }
    }

    save() {
        const template = JSON.stringify(this.template);
        const classes = this.template.reduce(
            (cls, { name }) => (cls[name] = this.classes[name]),
            {}
        );

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
}

export const useProject = () => {
    const [data, setData] = useState({});

    return {
        template: data.template,
        setTemplate: template => setData({ ...data, template }),
        classes: data.classes,
        setClasses: classes => setData({ ...data, classes }),
        id: data.id,
        name: data.name,
        set: data => setData(data),
        save: () => {
            const template = JSON.stringify(this.template);
            const classes = this.template.reduce(
                (cls, { name }) => (cls[name] = this.classes[name]),
                {}
            );

            return db
                .collection('projects')
                .doc(this.id)
                .update({ template, classes });
        },
    };
};

const templateUtils = {
    fromObject: obj =>
        Object.entries(obj).map(([name, data]) => ({
            name,
            data,
        })),
    normalize: obj =>
        Array.isArray(obj) ? obj : templateUtils.fromObject(obj),
};
