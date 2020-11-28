import React from 'react';
import { withRouter, Link } from 'react-router-dom';
class Header7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /*Retorno del botón  dependiendo desde la cual se accedió.*/
    Accion1 = () => {
        if (this.props.location.state.x == "/Principal_") {
            if (this.props.location.state.pagina == "undefined") {
                return (
                    <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x2 } }}>
                        <button className="botonHeader7"></button>
                    </Link>
                );
            } else {
                return (
                    <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x2, pagina: this.props.location.state.x3 } }}>
                        <button className="botonHeader7"></button>
                    </Link>
                );

            }

        } else if (this.props.location.state.x != "/Integrados") {
            return (
                <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x } }}>
                    <button className="botonHeader7"></button>
                </Link>
            );
        } else {
            return (
                <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x, pagina: this.props.location.state.x3 } }}>
                    <button className="botonHeader7"></button>
                </Link>
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
                    <h2 className="notificaciones">Notificaciones</h2>
                </div>
            </>
        );
    }
}

export default withRouter(Header7);