import React from 'react';

import Header2 from '../Components/Header2';
import Main3 from '../Components/Main3';
import Footer from '../Components/Footer';

import {UsuarioI} from "../Utiles/Mocks/UsuarioI";
import {Redirect} from 'react-router-dom';

let aja;

class Integrados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    prueba=()=>{
        aja =false;
        try{    
            let x = (UsuarioI[0].FechaN).getFullYear();    
        }
        catch(e){
            aja=true;    
        }}

    render() { 
        return (
        <>
        <Header2 Componente="/Integrados"/>
        <Main3 />
        <Footer />

        {this.prueba()}
        {aja && <Redirect to="/"/>}
        </>  );
    }
}
 
export default Integrados;