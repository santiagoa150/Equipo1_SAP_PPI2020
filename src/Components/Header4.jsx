import React from 'react';
import '../Styles/Header4.css';
import {withRouter, Link} from 'react-router-dom';
class Header4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div id="Header4Container">
                <h2>{this.props.location.state.InfoClass.titulo}</h2>
                <Link  to="/Clases"> 
                <button className="button buttonClass">Atrás</button>
                </Link>
            </div>
            </>
         );
    }
}
 
export default withRouter(Header4);