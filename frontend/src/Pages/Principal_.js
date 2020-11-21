import React from 'react';
import Header2 from '../Components/Header2';
import Main2 from '../Components/Main2';
import Main3 from '../Components/Main3';
import Main5 from '../Components/Main5';
import Main6 from '../Components/Main6';
import Menu from '../Components/Menu';
import Footer from '../Components/Footer';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
let aja;

let Component = "";

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    prueba = () => {
        aja = false;
        try {
            let x = (UsuarioI[0].fecha_n).getFullYear();
        }
        catch (e) {
            aja = true;
        }
    }

    Ruta = () => {
        let x = this.props.location.state.x;
        if (x == "/Principal" || x == "/principal") {
            return (<Main2 />);
        } else if (x == "/Integrados") {
            return (<Main3 />)
        } else if (x == "/Clases") {
            return (<Main5 />)
        } else if (x == "/misCursos") {
            return (<Main6 />)
        }
    }
    Accion1 = () => {
        if (this.props.location.state.x == "/Integrados") {
            return (
                <Header2 Componente={this.props.location.state.x} Pagina={this.props.location.state.pagina} />);
        } else {
            return (
                <Header2 Componente={this.props.location.state.x} />);
        }
    }
    render() {
        return (
            <>

                <div id="gridP">
                    <div id="HP">
                        {this.Accion1()}

                    </div>
                    <div id="MP">
                        <div className="blur">
                            {this.Ruta()}
                        </div>
                        <Footer />
                    </div>
                    <div id="MeP">
                        <Menu Ruta={this.props.location.state.x} />
                    </div>
                </div>
                {this.prueba()}
                {aja && <Redirect to="/" />}
            </>
        );
    }
}

export default withRouter(Principal);