import React from 'react';

import '../Styles/Cursos.css';
import { withRouter } from 'react-router-dom';
import Header from "../Components/Header5";
import Footer from "../Components/Footer";
import axios from 'axios';
class Didactico extends React.Component {
    async componentDidMount() {
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
        .then(res =>{
            this.setState({DataCurso: res.data});
        }).catch(err =>{
            console.error(err);
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            DataCurso: []
        }
    }

    render() {
        return (
            <>
                <Header />
                <iframe className="formGames" src={this.state.DataCurso[0]?.contenido_d}></iframe>
                <Footer />
            </>
        );
    }
}

export default withRouter(Didactico);