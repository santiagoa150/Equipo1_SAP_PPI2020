import React from 'react';
import Header2 from '../Components/Header2';
import Footer from '../Components/Footer';
import Main6 from '../Components/Main6';

class MisCursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <Header2 Componente="/misCursos"/>
                <Main6 />
                <Footer />
            </>
         );
    }
}
 
export default MisCursos;