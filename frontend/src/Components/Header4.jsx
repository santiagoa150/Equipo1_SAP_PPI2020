import React from 'react';
import '../Styles/Header4.css';
import { withRouter, Link } from 'react-router-dom';
class Header4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    Accion1 = () => {
        if (this.props.location.state.return == "/Clases") {
            return (
                <Link to={this.props.location.state.return}>
                    <button className="botonHeader7"></button>
                </Link>
            );
        } else {
            return (
                <Link to={{ pathname: this.props.location.state.return, state: { InfoClass: this.props.location.state.InfoClass, return: "/Clases"} }}>
                    <button className="botonHeader7"></button>
                </Link>
            );
        }
    }
    Accion2 = () =>{
        if(this.props.location.state.return == "/Clases"){
            return(
                <h2 className="notificaciones">{this.props.location.state.InfoClass.titulo}</h2>
            );
        }else{
            return(
                <h2 className="notificaciones">{this.props.location.state.titulo}</h2>
            );
        }
    }
    render() {
        return (
            <>
                <div id="Header7Container">
                    <div>
                        {this.Accion1()}
                    </div>
                    {this.Accion2()}
                </div>
            </>
        );
    }
}

export default withRouter(Header4);