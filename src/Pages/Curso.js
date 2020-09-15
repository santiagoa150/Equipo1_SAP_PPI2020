import React from 'react';

import Header3 from '../Components/Header3';
import Main4 from '../Components/Main4';
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
            <Header3 id={this.props.location.state.id}/>
            <Main4 id={this.props.location.state.id}/>
            <Footer />
            </>
         );
    }
}
 
export default withRouter(Curso);