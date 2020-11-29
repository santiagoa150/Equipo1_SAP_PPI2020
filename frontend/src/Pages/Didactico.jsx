import React from 'react';
import '../Styles/Cursos.css';
import { withRouter } from 'react-router-dom';
import Header from "../Components/Header5";
import Footer from "../Components/Footer";
import axios from 'axios';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
const fs = require('fs');
class Didactico extends React.Component {
    async componentDidMount() {
        if(this.props.location.state){
        await axios.get(`http://localhost:3883/Fil/get-Examne-Contenido/Didactico/${this.props.location.state.id}&${UsuarioI[0].usuario}`)
            .then(res => {
                this.setState({ DataCurso: res.data });
            }).catch(err => {
                console.error(err);
            })
        }
    }
    componentWillUnmount(){
        axios.get(`http://localhost:3883/Fil/get-Examne-Contenido-delete/Didactico/${this.props.location.state.id}&${UsuarioI[0].usuario}`)
        .then(res =>{

        }).catch(err =>{
            if(err){
                console.error(err);
            }
        })
    }
    iframe = () =>{
        if(this.state.DataCurso[0]?.contenido_d_text != null){
            return(
                <iframe className="formGames" src={`http://localhost:3883/Fil/file-Didactico/${UsuarioI[0].usuario}&${this.state.DataCurso[0]?.id_creador}&${this.state.DataCurso[0]?.id}/`}></iframe>
            );
        }else{
            return(
            <div className="formGames">
                <p>Hola</p>
            </div>  
            );
        }
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
                {this.iframe()}
                <Footer />
            </>
        );
    }
}

export default withRouter(Didactico);