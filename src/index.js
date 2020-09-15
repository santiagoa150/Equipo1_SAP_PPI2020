import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Pages/Home';
import Principal from './Pages/Principal';
import Principal_ from './Pages/Principal_';
import Perfil from './Pages/Perfil';
import Integrados from './Pages/Inte_Comu';
import Curso from './Pages/Curso';
import MisCursos from './Pages/MisCursos';
import Clases from './Pages/Clases.js';

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
                <Route path="/misCursos">
                    <MisCursos />
                </Route>
                <Route path="/Clases" >
                    <Clases />
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