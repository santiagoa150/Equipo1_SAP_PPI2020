import React from 'react';
import '../Styles/Cursos.css';
import { withRouter } from 'react-router-dom';
import Header from "../Components/Header5";
import Footer from "../Components/Footer";
import axios from 'axios';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
const fs = require('fs');
class Didactico extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            DataCurso: []
        }
    }
    async componentDidMount() {
        await axios.get(`http://localhost:3883/Fil/get-Examne-Contenido/Didactico/${this.props.location.state.id}&${UsuarioI[0].usuario}`)
            .then(res => {
                this.setState({ DataCurso: res.data });
            }).catch(err => {
                console.error(err);
            })
    }
    componentDidUpdate =()=>{
        document.getElementById("carga").style.display="none";
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
                <iframe className="formGames" src={`http://localhost:3883/Fil/file-Didactico/${UsuarioI[0].usuario}/`}></iframe>
            );
        }else{
            return(
            <div className="formGames">
                <h1>El curso no tiene ningun contenido Didactico</h1>
            </div>  
            );
        }
    }
    render() {
        return (
            <>
                <Header />                
                <div className="Cargando" id="carga"></div>
                {this.iframe()}
            </>
        );
    }
}

export default withRouter(Didactico);