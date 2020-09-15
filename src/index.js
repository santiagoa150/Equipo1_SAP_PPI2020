import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Pages/Home';
import Principal from './Pages/Principal';
import Principal_ from './Pages/Principal_';
import Perfil from './Pages/Perfil';
import Integrados from './Pages/Integrados';
import Curso from './Pages/Curso';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode >
        <Router >
            <Switch >
                <Route path="/Perfíl" >
                    <Perfil />
                </Route>
                <Route path="/Principal" >
                    <Principal />
                </Route>
                <Route path="/Principal_" >
                    <Principal_ />
                </Route>
                <Route path="/Integrados" >
                    <Integrados />
                </Route>
                <Route path="/Curso">
                    <Curso />
                </Route>
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);