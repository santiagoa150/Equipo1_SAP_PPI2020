import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Cursos.css';
class Header5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataCurso: []
        }
    }
    componentDidMount() {
        this.getCursoComunidad();
        if (this.props.location.state.cantidad) { 
            document.getElementById("element").style.display = "none"; 
            document.getElementById("element2").style.display = "none"; 
        }
    }
    /*Metodo que trae la información del curso al que se entra.*/
    getCursoComunidad = async () => {
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
            .then(res => {
                this.setState({ DataCurso: res.data });
            }).catch(err => {
                console.error(err);
            })
    }
    render() {
        return (
            <>
                <div id="Header3Container">
                    <Link id="element" to={{
                        pathname: "/Curso",
                        state: {
                            id: this.state.DataCurso[0]?.id,
                            pagina: this.props.location.state.pagina
                        }
                    }}>
                        <div id="AtrasCurso">
                        </div>
                    </Link>
                    <h2 id="TitleCurso">{this.state.DataCurso[0]?.titulo}</h2>
                    <span id="element2"></span>
                </div>
            </>
        );
    }
}

export default withRouter(Header5);