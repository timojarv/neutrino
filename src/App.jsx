import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import ProjectView from './ProjectView';
import ProjectManager from './ProjectManager';
import { useUser } from './util/hooks';
import { Title } from './base';
import Header from './Header';
import { ReactComponent as BlankCanvas } from './svg/blank_canvas.svg';

const Container = styled.main`
    padding-top: 8rem;
`;

const Hero = styled.section`
    text-align: center;
`;

const App = () => {
    const { user } = useUser();
    return (
        <Router>
            <Header />
            <Container>
                {user ? (
                    <Switch>
                        <Route exact path="/" component={ProjectManager} />
                        <Route path="/:id" component={ProjectView} />
                        <Redirect to="/" />
                    </Switch>
                ) : (
                    <Hero>
                        <BlankCanvas width={300} height={300} />
                        <Title as="h2">Hello, start by logging in.</Title>
                    </Hero>
                )}
            </Container>
        </Router>
    );
};

export default App;
