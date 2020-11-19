import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Pages/Home';
import Principal from './Pages/Principal';
import Principal_ from './Pages/Principal_';
import Perfil from './Pages/Perfil';
import Integrados from './Pages/Inte_Comu';
import Curso from './Pages/Curso';
import Didactico from './Pages/Didactico';
import MisCursos from './Pages/MisCursos';
import Clases from './Pages/Clases';
import Clase from './Pages/Clase';
import CrearCurso from './Pages/CrearCurso';
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
                <Route path="/Didactico">
                    <Didactico />
                </Route>
                <Route path="/CrearCurso" component={CrearCurso}/>
                <Route path="/Clase" component={Clase}/>
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);