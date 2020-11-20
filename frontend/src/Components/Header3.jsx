import React from 'react';
import axios from 'axios';
import Header1 from '../Components/Header1';
import { withRouter, Link } from 'react-router-dom';
import { Cursos } from '../Utiles/Mocks/Cursos';

import '../Styles/Cursos.css';



class Header3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CursoData: []
        }
    }
    Accion1 = () =>{
        axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
            .then(res => {
                this.setState({ CursoData: res.data });
                console.log(res.data);
                console.log(this.state.CursoData);
            }).catch(err => {
                console.error(err);
            })
    }

    render() {

        return (
            <>
            {this.Accion1()}
                <div id="Header3Container">
                    <Link to="/misCursos">
                        <div id="AtrasCurso">

                        </div>
                    </Link>
                    <h2 id="TitleCurso">{this.state.CursoData[0].titulo}</h2>
                    <Link className="GuardarCurso" to="/misCursos">
                        <button className="button GuardarCurso2">Guardar</button>
                    </Link>
                </div>
            </>
        );
    }
}

export default withRouter(Header3);