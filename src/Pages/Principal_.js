import React from 'react';

import Header2 from '../Components/Header2';
import Main2 from '../Components/Main2';
import {withRouter} from 'react-router-dom';
class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return ( 
            <>  
            <div id="gridP">
                <div id="HP"><Header2 state={{menu:this.props.location.state.menu,
                logo:this.props.location.state.logo,
                perfil:this.props.location.state.perfil}}/></div>
                
            </div> 
            </>
        );
    }
}

export default withRouter(Principal);