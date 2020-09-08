import React from 'react';

import '../Styles/Header2.css';
import '../Styles/Header2.css';
import {withRouter, Link} from 'react-router-dom';
let x;
class Header2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    ureles=()=>{
        x=this.props.location.pathname;
        let pathfin= x.substr(x.length-1);
        if(pathfin!="_"){
            return <>
                <Link to={x+"_"}>
                <div id="menu">
                </div>                    
                </Link>                
                </>;
        }
        else{
            return <><Link id="link" to={x.substr(0,x.length-1)}>
                    <div id="menu">
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
                <div id="logo">                     
                </div>
                <Link to={{pathname:"/Perfíl", state:{
                    x:x
                }}}>
                <div id="profile">                     
                </div>
                </Link>
            </div>
            </>
          );
    }
}

export default withRouter(Header2);