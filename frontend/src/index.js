import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/Home.jsx';
import Principal from './Pages/Principal.jsx';
import Principal_ from './Pages/Principal_.jsx';
import Perfil from './Pages/Perfil.jsx';
import Integrados from './Pages/Inte_Comu.jsx';
import Curso from './Pages/Curso.jsx';
import Didactico from './Pages/Didactico.jsx';
import MisCursos from './Pages/MisCursos.jsx';
import Clases from './Pages/Clases.jsx';
import Clase from './Pages/Clase.jsx';
import CrearCursoTeorico from './Pages/CrearCursoTeorico.jsx';
import CrearCurso from './Pages/CrearCurso.jsx';
import Examen from './Pages/Examen.jsx';
import Notificaciones from './Pages/Notificaciones.jsx';
import CrearContenidoDidactico from './Pages/CrearCursoDidactico.jsx';
<<<<<<< HEAD
import CalificacionesClaseCurso from './Pages/CalificacionesClaseCurso.jsx';
=======
import CrearExamen from './Pages/CrearCursoExamen.jsx';
>>>>>>> 39843e43121cbdc4fb094971e09245e03bad37c7
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
                <Route path="/Examen" >
                    <Examen />
                </Route>
                <Route path="/misCursos">
                    <MisCursos />
                </Route>
                <Route  path="/CalificacionesClaseCurso" component={CalificacionesClaseCurso}/>
                <Route path="/Clases" >
                    <Clases />
                </Route>
                <Route path="/Curso">
                    <Curso />
                </Route>
                <Route path="/Didactico">
                    <Didactico />
                </Route>
                <Route path="/CrearExamen">
                    <CrearExamen />
                </Route>
                <Route path="/CrearCurso" component={CrearCurso}/>
                <Route path="/CrearCursoTeorico" component={CrearCursoTeorico}/>
                <Route path="/CrearCursoDidactico" component={CrearContenidoDidactico}/>
                <Route path="/Clase" component={Clase}/>
                <Route path="/Notificaciones" component={Notificaciones}/>
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);