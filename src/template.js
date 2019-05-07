const template = {
    fromObject: obj =>
        Object.entries(obj).map(([name, data]) => ({
            name,
            data,
        })),
    normalize: obj => (Array.isArray(obj) ? obj : template.fromObject(obj)),
};

export default template;
