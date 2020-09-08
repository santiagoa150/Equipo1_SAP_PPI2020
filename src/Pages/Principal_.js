import React from 'react';

import Header2 from '../Components/Header2';
import Main2 from '../Components/Main2';
import Menu from '../Components/Menu';
import Footer from '../Components/Footer';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
let aja;
class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
prueba=()=>{
    aja =false;
    try{    
        console.log((UsuarioI[0].FechaN).getFullYear());    
    }
    catch(e){
        aja=true;    
    }}
    render() {
        return ( 
            <>  
            <div id="gridP">
                <div id="HP"><Header2 /></div>
                <div id="MP"><Main2/>
                <Footer /></div>
                <div id="MeP"><Menu/></div>
                </div> 
                {this.prueba()}
                {aja && <Redirect to="/"/>}
            </>
        );
    }
}

export default withRouter(Principal);