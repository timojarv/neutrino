import {
    PROJECTS_FETCHED,
    PROJECT_OPENED,
    PROJECT_SAVED,
    PROJECT_UPDATED,
} from '../actions';

const initialState = {
    openedProject: false,
    projects: {},
};

const rootReducer = (state = initialState, action) => {
    const payload = action.payload || {};
    switch (action.type) {
        case PROJECTS_FETCHED:
            return { ...state, projects: payload.projects };
        case PROJECT_OPENED:
            return { ...state, openedProject: payload.id };
        case PROJECT_SAVED:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [payload.id]: {
                        ...state.projects[payload.id],
                        saved: true,
                    },
                },
            };
        case PROJECT_UPDATED:
            const { name, template, classes } = payload;
            const id = state.openedProject;
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [id]: {
                        ...state.projects[id],
                        template: template
                            ? state.projects[id].template.map(c =>
                                  c.name === name ? { name, data: template } : c
                              )
                            : state.projects[id].template,
                        classes: classes
                            ? { ...state.projects[id].classes, [name]: classes }
                            : state.projects[id].classes,
                    },
                },
            };
        default:
            return state;
    }
};

export default rootReducer;
