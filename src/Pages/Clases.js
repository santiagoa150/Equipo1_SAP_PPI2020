import React from 'react';
import Header2 from '../Components/Header2';
import Main5 from '../Components/Main5';
import Footer from '../Components/Footer';
import {withRouter} from 'react-router-dom';

class Curso extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <Header2 Componente="/Clases"/>
            <Main5 />
            <Footer />
            </>
         );
    }
}
 
export default withRouter(Curso);