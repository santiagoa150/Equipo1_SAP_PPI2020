import React from 'react';
import Header2 from '../Components/Header2';
import Main2 from '../Components/Main2';
import Footer from '../Components/Footer';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
import { Redirect } from 'react-router-dom';

let aja;
class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    prueba=()=>{
        aja =false;
        try{    
            let x = (UsuarioI[0].fecha_n).getFullYear();    
        }
        catch(e){
            aja=true;    
        }}
    render() {
        return ( 
            <>
                <Header2 Componente="/Principal"/> 
                <Main2/>
                <Footer/>
                {this.prueba()}
                {aja && <Redirect to="/"/>}
            </>
        );
    }
}

export default Principal;