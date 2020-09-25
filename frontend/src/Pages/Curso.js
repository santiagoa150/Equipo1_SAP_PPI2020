import React from 'react';

import Header3 from '../Components/Header3';
import Main4 from '../Components/Main4';
import Footer from '../Components/Footer';
import {withRouter} from 'react-router-dom';
import {Progreso} from '../Utiles/Mocks/progreso';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';

class Curso extends React.Component {
    componentDidMount(){
       let progresoF = Progreso.filter(Esito => (Esito.idUsuario == UsuarioI[0].id) && (Esito.idCurso == this.props.location.state.id));
        if(progresoF.length == 0){   
            Progreso.push({
                idUsuario: UsuarioI[0].id,
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
            <Header3 />
            <Main4 id={this.props.location.state.id}/>
            <Footer />
            </>
         );
    }
}
 
export default withRouter(Curso);