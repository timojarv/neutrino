import { useState, useEffect, useCallback } from 'react';
import { db } from './firebase';
import { deserialize } from './serde';

const useProject = id => {
    const [data, setData] = useState();
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        db.collection('projects')
            .doc(id)
            .get()
            .then(doc => {
                const id = doc.id;
                const { template, classes, ...data } = doc.data();
                setData({
                    id,
                    template: deserialize(template) || [],
                    classes: deserialize(classes) || {},
                    ...data
                });
                setSaved(true);
            });
    }, [id]);

    useEffect(() => setSaved(false), [data, setSaved]);

    const setTemplate = useCallback(
        template => setData({ ...data, template }),
        [data, setData]
    );

    const setClasses = useCallback(classes => setData({ ...data, classes }), [
        data,
        setData
    ]);

    const save = useCallback(() => {
        const template = JSON.stringify(data.template);
        const classes = JSON.stringify(
            data.template.reduce(
                (cls, { name }) => {
                    cls[name] = data.classes[name] || '';
                    return cls;
                },
                { global: data.classes.global || '' }
            )
        );

        return db
            .collection('projects')
            .doc(data.id)
            .update({ template, classes })
            .then(() => setSaved(true));
    }, [data]);

    return {
        ...data,
        setTemplate,
        setClasses,
        save,
        saved,
        loading: !data
    };
};

export default useProject;
