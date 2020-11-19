import React from 'react';

import '../Styles/Cursos.css';
import { Link, withRouter } from 'react-router-dom';
import { Cursos } from '../Utiles/Mocks/Cursos';
class Main4 extends React.Component {
    componentDidMount() {
        document.getElementById("TeoriaCurso").innerHTML = Cursos[this.props.id].conT;
    }
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div id="Main4Container">
                    <div id="TeoriaCurso">
                    </div>

                    <Link id="DidaCurso" to={{pathname:"/Didactico",
                    state:{
                        id:this.props.id
                    }}}>
                        <button className="LinkCursoMain4">Jugar</button>
                    </Link>

                    <Link id="ExaCurso">
                        <button className="LinkCursoMain4">Pruebate</button>
                    </Link>

                </div>
            </>
        );
    }
}

export default withRouter(Main4);