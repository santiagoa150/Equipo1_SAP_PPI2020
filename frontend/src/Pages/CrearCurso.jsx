import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import Header6 from '../Components/Header6';
import Main8 from '../Components/Main8';
class Crearcurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <Header6/>
                <Main8/>
            </>
         );
    }
}
 
export default withRouter(Crearcurso);