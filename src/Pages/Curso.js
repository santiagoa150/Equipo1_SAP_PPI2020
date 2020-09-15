import React from 'react';

import Header3 from '../Components/Header3';
import Main4 from '../Components/Main4';
import Footer from '../Components/Footer';
import {withRouter} from 'react-router-dom';
import {progreso} from '../Utiles/Mocks/progreso';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';

class Curso extends React.Component {
    componentDidMount(){
       let progresoF = progreso.filter(Esito => Esito.idUsuario == UsuarioI.id && Esito.idCurso == this.props.location.state.id);
        if(progresoF.length == 0){
            progreso.push({
                idUsuario: UsuarioI.id,
                idCurso: this.props.location.state.id,
                calificacion: 0
            });
        } 
    }
    
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <Header3 id={this.props.location.state.id}/>
            <Main4 id={this.props.location.state.id}/>
            <Footer />
            </>
         );
    }
}
 
export default withRouter(Curso);