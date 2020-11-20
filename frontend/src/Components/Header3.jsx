import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import '../Styles/Cursos.css';
class Header3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
     componentWillMount(){
         axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
            .then(res => {
                this.setState({data: res.data})
                console.log();
            }).catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <>
                <div id="Header3Container">
                    <Link to="/misCursos">
                        <div id="AtrasCurso">

                        </div>
                    </Link>
                    <h2 id="TitleCurso">{this.state.data[0]?.titulo}</h2>
                    <Link className="GuardarCurso" to="/misCursos">
                        <button className="button GuardarCurso2">Guardar</button>
                    </Link>
                </div>
            </>
        );
    }
}

export default withRouter(Header3);