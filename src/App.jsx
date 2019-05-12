import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import ProjectView from './ProjectView';
import ProjectManager from './ProjectManager';

const Container = styled.main`
    padding-top: 8rem;
`;

const App = () => {
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/" component={ProjectManager} />
                    <Route path="/:id" component={ProjectView} />
                    <Redirect to="/" />
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
