import React from 'react';
import '../Styles/Header2.css';
import '../Styles/Header2.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import axios from 'axios';
let x, bool = false;
class Header2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNotificaciones: []
        }
    }

    componentDidMount() {
        let avatar = '';
        if (UsuarioI[0].avatar == null) {
            avatar = 'https://1.bp.blogspot.com/-p-TNqGEoS5w/X1PrFJ6rBYI/AAAAAAAAPQU/cgfqUztLg1YJL0zxyfRp8sEkhWGsymFUwCLcBGAsYHQ/s16000/Perf%25C3%25ADlLogo.png'
        } else {
            avatar = UsuarioI[0].avatar;
        }
        document.getElementById("profile").style.backgroundImage = "url(" + avatar + ")";
        this.getNotificaciones();
    }
    componentDidUpdate(){
        this.getNotificaciones();
    }
    /*METODOS QUE HACEN EL CORRECTO FUNCIONAMIENTO DEL MENÚ*/
    ureles = () => {
        x = this.props.location.pathname;
        let pathfin = x.substr(x.length - 1);
        if (pathfin != "_") {
            return <>
                {this.algo()}
            </>;
        }
        else {
            if (this.props.Componente != "/Integrados") {
                return <>
                    <Link id="link" to={this.props.Componente}>
                        <div id="menu">
                        </div>
                    </Link>
                </>;
            } else {
                return <>
                    <Link id="link" to={{ pathname: this.props.Componente, state: { pagina: this.props.location.state.pagina } }}>
                        <div id="menu">
                        </div>
                    </Link>
                </>
            }
        }
    }
    algo = () => {
        if (this.props.Componente != "/Integrados") {
            return (<Link to={{
                pathname: "/Principal_",
                state: {
                    x: x
                }
            }}>
                <div id="menu">
                </div>
            </Link>)
        } else {
            return (
                <Link to={{
                    pathname: "/Principal_",
                    state: {
                        x: x,
                        pagina: this.props.location.state.pagina
                    }
                }}>
                    <div id="menu">
                    </div>
                </Link>
            )
        }
    }
    minieventico = () => {
        bool = true;
    }
    /*FUNCIONAMIENTO DE LA CAMPANA*/
    retornoCampana = () => {
        if (this.state.dataNotificaciones[0]?.conteo > 0) {
            return (
                <div className="CositoCampana">
                    <p>{this.state.dataNotificaciones[0]?.conteo}</p>
                </div>
            );
        }else{
            return(<>
            </>);
        }
    }
    /*ACIOS*/
    /*GETS*/
    /*Este get sirve para traer todas las notificaciones de un usuario*/
    getNotificaciones = async () => {
        await axios.get(`https://learnwithus2020.herokuapp.com/Usu/Not/get_notificaciones_count/Header2/${UsuarioI[0].id_usuario}&${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({ dataNotificaciones: res.data })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    render() {
        return (
            <>
                <div id="Header2Container">
                    {this.ureles()}
                    <div id="logo">
                    </div>

                    <div className="ContenedorH2NotiPerfil">
                        <Link className="LInKNotificaciones" to={{
                            pathname: "/Notificaciones", state: {
                                x: x,
                                x2: this.props.Componente,
                                x3: this.props.Pagina
                            }
                        }}>
                            <div className="Campana">
                                {this.retornoCampana()}
                            </div>
                        </Link>
                        <Link to={{
                            pathname: "/Perfíl", state: {
                                x: x,
                                x2: this.props.Componente,
                                x3: this.props.Pagina
                            }
                        }}>
                            <div id="profile">
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Header2);