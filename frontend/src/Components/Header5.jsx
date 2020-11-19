import React from 'react';

import Header1 from '../Components/Header1';
import {withRouter, Link} from 'react-router-dom';
import {Cursos} from '../Utiles/Mocks/Cursos';

import '../Styles/Cursos.css';



class Header5 extends React.Component {
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
                    <Link to={{pathname:"/Curso",
                    state:{
                        id:this.props.location.state.id
                    }}}>
                    <div id="AtrasCurso">

                    </div>
                    </Link>
                         <h2 id="TitleCurso">{this.state.Curso.titulo}</h2>
                    <span></span>
                </div>
            </>
          );
    }
}
 
export default withRouter(Header5);