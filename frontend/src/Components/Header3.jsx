import React from 'react';

import Header1 from '../Components/Header1';
import {withRouter, Link} from 'react-router-dom';
import {Cursos} from '../Utiles/Mocks/Cursos';

import '../Styles/Cursos.css';



class Header3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Curso: Cursos[this.props.location.state.id]
         }
    }


    render() { 
        
        return (
            <>

                <div id="Header3Container">
                    <Link to={{pathname:"/Integrados",state:{pagina:this.state.Curso.Tipo}}}>
                    <div id="AtrasCurso">

                    </div>
                    </Link>
                         <h2 id="TitleCurso">{this.state.Curso.titulo}</h2>
                         <Link className="GuardarCurso" to="/Integrados">
                    <button className="button GuardarCurso2">Guardar</button>
                    </Link>
                </div>
                
            </>
          );
    }
}
 
export default withRouter(Header3);