import React from 'react';

import { progreso } from '../Utiles/Mocks/progreso';
import { UsuarioI } from '../Utiles/Mocks/progreso';

import Header2 from '../Components/Header2';

class MisCursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <Header2 />
            </>
         );
    }
}
 
export default MisCursos;