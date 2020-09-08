import React from 'react';

import '../Styles/Header2.css';
import '../Styles/Header2.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI} from '../Utiles/Mocks/UsuarioI';
let x, bool = false;

class Header2 extends React.Component {
    componentDidMount(){
        document.getElementById("profile").style.backgroundImage = "url("+ UsuarioI[0].image + ")";
     }
    constructor(props) {
        super(props);
        this.state = {}
    }
    ureles = () => {
        x = this.props.location.pathname;
        let pathfin = x.substr(x.length - 1);
            if (pathfin != "_") {
                return <>
                    <Link to={{pathname: "/Principal_", 
                    state:{
                    x: x }}}>
                        <div id="menu">
                        </div>
                    </Link>
                </>;
            }
            else {
                return <>
                <Link id="link" to={this.props.Componente}>
                    <div id="menu">
                    </div>
                </Link>
                </>;
            }
    }
    minieventico = () =>{
        bool = true;
    }


    render() {
        return (
            <>
                <div id="Header2Container">
                    {this.ureles()}

                    <div id="logo">
                    </div>

                    <Link to={{
                        pathname: "/Perfíl", state: {
                            x: x
                        }
                    }}>
                        
                        <div id="profile">
                        </div>
                    </Link>
                </div>
            </>
            
        );
       
    }
    
}

export default withRouter(Header2);