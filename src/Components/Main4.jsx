import React from 'react';

import '../Styles/Cursos.css';
import {withRouter} from 'react-router-dom';
import {Cursos} from '../Utiles/Mocks/Cursos';
class Main4 extends React.Component {
    componentDidMount() {
        document.getElementById("TeoriaCurso").innerHTML = Cursos[this.props.id].conT;
    }
    constructor(props) {
        super(props);
        this.state = { 
           
         }
    }

    render() { 
        return (
            <>
                <div id="Main4Container">
                    <div id="TeoriaCurso">
                    </div>
                    <div id="DidaCurso">

                    </div>
                    <div id="ExaCurso">

                    </div>
                </div>
            </>
          );
    }
}
 
export default withRouter(Main4);