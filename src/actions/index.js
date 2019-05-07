import { db, auth } from '../firebase';
import { deserialize, serialize } from '../serde';

const projects = () => db.collection('projects');
const ownProjects = () =>
    db
        .collection('projects')
        .where('owner', '==', auth.currentUser.uid)
        .orderBy('created');

export const PROJECTS_FETCHED = '@neutrino/projects/fetched';
export const PROJECT_OPENED = '@neutrino/project/opened';
export const PROJECT_UPDATED = '@neutrino/project/update';
export const PROJECT_SAVED = '@neutrino/project/saved';

export const fetchProjects = () => dispatch =>
    ownProjects()
        .get()
        .then(res =>
            dispatch({
                type: PROJECTS_FETCHED,
                payload: {
                    projects: res.docs.reduce((docs, doc) => {
                        const data = doc.data();
                        const template = deserialize(data.template) || [];
                        const classes = deserialize(data.classes) || {};
                        return Object.assign(docs, {
                            [doc.id]: { classes, template, name: data.name }
                        });
                    }, {})
                }
            })
        );

export const openProject = id => ({
    type: PROJECT_OPENED,
    payload: { id }
});

export const createProject = (name, template = '', classes = '') => dispatch =>
    projects()
        .add({
            name,
            template,
            classes,
            created: Date.now(),
            owner: auth.currentUser.uid
        })
        .then(() => dispatch(fetchProjects));

export const deleteProject = id => dispatch =>
    projects()
        .doc(id)
        .remove()
        .then(() => dispatch(fetchProjects));

export const saveProject = () => (dispatch, getState) => {
    const state = getState();
    if (!state.openedProject) return;
    const { name, template, classes } = state.projects[state.openedProject];
    return projects()
        .doc(state.openedProject)
        .update({
            name,
            template: serialize(template, JSON),
            classes: serialize(classes, JSON)
        })
        .then(() =>
            dispatch({
                type: PROJECT_SAVED,
                payload: { id: state.openedProject }
            })
        );
};

export const updateComponent = data => ({
    type: PROJECT_UPDATED,
    payload: { ...data }
});

export const updateTemplate = template => updateComponent({ template });

export const updateClasses = classes => updateComponent({ classes });
