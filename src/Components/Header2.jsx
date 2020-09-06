import React from 'react';

import '../Styles/Header2.css';
import '../Styles/Header2.css';
import {withRouter, Link} from 'react-router-dom';
class Header2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    ureles=()=>{
        let x=this.props.location.pathname;
        let pathfin= x.substr(x.length-1);
        if(pathfin!="_"){
            return <><Link to={{pathname: x+"_",state: {
                logo:"hola1",
                menu:"hola2",
                perfil: "hola3"
            }}}>
                    <div id="menu">
                    </div>                    
                </Link>
                <div id="logo">                     
                </div>
                <Link to="/Perfíl">
                <div id="profile">                     
                </div>
                </Link>
                </>;
        }
        else{
            return <><Link id="link" to={x.substr(0,x.length-1)}>
                    <div id="menu" className={this.props.state.menu}>
                    </div>                    
                </Link>
                <div id="logo" className={this.props.state.logo}>                     
                </div>
                <Link to="/Perfíl">
                <div id="profile" className={this.props.state.perfil}>                     
                </div>
                </Link>
                </>;
        }
    }
    render() { 
        return (
            <>
            <div id="Header2Container">
                {this.ureles()}                            
                 
            </div>
            </>
          );
    }
}

export default withRouter(Header2);