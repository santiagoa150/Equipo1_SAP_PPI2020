import React from 'react';
import axios from 'axios';
import '../Styles/Main10.css';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
class Main10 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNotificaciones: [],
            filtrado: [],
            color: 1
        }
    }
    componentDidMount() {
        this.getNotificaciones();
    }
    componentDidUpdate() {
        document.getElementById("carga").style.display = "none";
    }
    /*METODO DE FILTRADO*/
    filtrado = (prop) => {
        document.getElementById('carga').style.display = "block";
        let data = this.state.dataNotificaciones;
        let filtrado;
        if (prop == 1) {
            filtrado = data.filter(f => ((f.id_creador_clase == UsuarioI[0].id_usuario && f.tipo_notificacion == 0) || (f.id_otro_usuario == UsuarioI[0].id_usuario && f.tipo_notificacion == 1)) && f.estado != 'rechazado')
        } else if (prop == 2) {
            filtrado = data.filter(f => ((f.id_otro_usuario == UsuarioI[0].id_usuario && f.tipo_notificacion == 0) || (f.id_creador_clase == UsuarioI[0].id_usuario && f.tipo_notificacion == 1)) && f.estado != "rechazado");
        } else {
            filtrado = data.filter(f => f.id_otro_usuario == UsuarioI[0].id_usuario && f.estado == 'rechazado' && f.tipo_notificacion == 0);
        }
        this.setState({
            color: prop,
            filtrado: filtrado
        });
    }
    /*AXIOS*/
    /*TODOS LOS GETS*/
    /*Este metodo sirve para traer todas las notificaciones de un usuario*/
    getNotificaciones = async () => {
        await axios.get(`http://localhost:3883/Not/get_notificaciones_info/Notificaciones/${UsuarioI[0].id_usuario}&${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({ dataNotificaciones: res.data });
                this.filtrado(1);
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*RETORNOS*/
    /*Este metodo sirve para retornar el color por defecto de un botón*/
    default = (prop) => {
        if (prop == this.state.color) {
            return "colorDark";
        }
    }
    /*Este metodo retorna el texto de las notificaciones en recibidos*/
    textRecibidos = (Notificacion) => {
        if (Notificacion.tipo_notificacion == 0) {
            return "El usuario " + Notificacion.usuario + " quiere unirse a tu clase " + Notificacion.titulo_clase;
        } else {
            return "El usuario " + Notificacion.usuario + " te está invitando a unirse a su clase " + Notificacion.titulo_clase;
        }
    }
    /*Este metodo retorna el texto de las notificaciones en enviados*/
    textEnviados = (Notification) => {
        if (Notification.tipo_notificacion == 0) {
            return "Estas solicitando a unirte a la clase " + Notification.titulo_clase;
        } else {
            return "Estas invitando al usuario " + Notification.usuario + " a unirse a tu clase " + Notification.titulo_clase;
        }
    }
    /*Este metodo retorna el texto de las notificaciones en rechazados*/
    textRechazados = (Notification) => {
        if (Notification.tipo_notificacion == 0) {
            return "El creador de la clase " + Notification.titulo_clase + " rechazó tu petición para unirte."
        } else {
            return "El usuario " + Notification.usuario + " rechazó tu invitación para unirse a tu clase " + Notification.titulo_clase;
        }
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                <div className="Main10Container">
                    <div className="Main10Switch">

                        <button className={"botonMain10 " + this.default(1)} onClick={() => { this.filtrado(1) }}>Recibidos</button>
                        <button className={"botonMain10 " + this.default(2)} onClick={() => { this.filtrado(2) }}>Enviados</button>
                        <button className={"botonMain10 " + this.default(3)} onClick={() => { this.filtrado(3) }}>Rechazados</button>
                    </div>
                    <div className="Main10Contain">
                        {this.state.filtrado?.map((Esito, index) => {
                            if (this.state.color == 1) {
                                return (
                                    <>
                                        <div key={index}>
                                            <p>{this.textRecibidos(Esito)}</p>
                                        </div>
                                    </>
                                );
                            } else if (this.state.color == 2) {
                                return (
                                    <>
                                        <div>
                                            <p>{this.textEnviados(Esito)}</p>
                                        </div>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <div>
                                            <p>{this.textRechazados(Esito)}</p>
                                        </div>
                                    </>
                                );
                            }
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default Main10;