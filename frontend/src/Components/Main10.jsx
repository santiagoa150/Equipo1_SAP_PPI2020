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
            color: 1,
            Modal1: {
                return: false,
                title: ""
            }
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
            filtrado = data.filter(f => ((f.id_creador_clase == UsuarioI[0].id_usuario && f.tipo_notificacion == 0) || (f.id_otro_usuario == UsuarioI[0].id_usuario && f.tipo_notificacion == 1))).reverse();
        } else if (prop == 2) {
            filtrado = data.filter(f => ((f.id_otro_usuario == UsuarioI[0].id_usuario && f.tipo_notificacion == 0) || (f.id_creador_clase == UsuarioI[0].id_usuario && f.tipo_notificacion == 1))).reverse();
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
                this.actualizacionEstado();
                this.filtrado(1);
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*TODOS LOS POST*/
    /*Este metodo sirve para aceptar las solicitudes*/
    postAceptarSolicitud = async (form) => {
        axios.post(`http://localhost:3883/UsuCla/post-usuario_clase-Info/Clases`, form)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*TODOS LOS DELETES*/
    deleteNotificacion = async (form2) => {
        axios.delete(`http://localhost:3883/Not/delete_notificaciones_info/Notificaciones/${form2.id_clase}&${form2.id_creador_clase}&${form2.id_otro_usuario}`)
            .then(res => {
                this.getNotificaciones();
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*TODOS LOS PUT*/
    actualizacionEstado = () => {
        axios.put(`http://localhost:3883/Not/put-notificaciones-estado/Notificaciones/${UsuarioI[0].id_usuario}&${UsuarioI[0].id_usuario}`)
            .then(res => { })
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    putCantidadUsuarios = (id_clase) =>{
        axios.put(`http://localhost:3883/Cla/Put-Clases-cantidad_usuarios/Clases/${id_clase}`)
        .then(res =>{})
        .catch(err =>{
            if(err){
                console.error(err);
            }
        });
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
            return "Estas invitando al usuario " + Notification.usuario2 + " a unirse a tu clase " + Notification.titulo_clase;
        }
    }
    /*METODOS DE ACEPTADO Y RECHAZADO DE LAS NOTIFICACIÓNES*/
    /*Este metodo sirve para aceptar una notificación en recibidos*/
    AceptarNotifi = async (Notification) => {
        let Fecha = new Date();
        let FechaY = Fecha.getFullYear();
        let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
        let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
        let FechaH = FechaY + "-" + FechaM + "-" + FechaD;
        let form, form2;
        if (Notification.tipo_notificacion == 0) {
            form = {
                id_usuario: Notification.id_otro_usuario,
                id_clase: Notification.id_clase,
                fecha_u: FechaH
            }
            form2 = {
                id_clase: Notification.id_clase,
                id_creador_clase: UsuarioI[0].id_usuario,
                id_otro_usuario: Notification.id_otro_usuario
            }
        } else {
            form = {
                id_usuario: UsuarioI[0].id_usuario,
                id_clase: Notification.id_clase,
                fecha_u: FechaH
            }
            form2 = {
                id_clase: Notification.id_clase,
                id_creador_clase: Notification.id_creador_clase,
                id_otro_usuario: UsuarioI[0].id_usuario
            }
        }
        await axios.get(`http://localhost:3883/Not/get-notificaciones-length/clases/${form2.id_clase}&${form2.id_creador_clase}&${form2.id_otro_usuario}`)
            .then(res => {
                let data = res.data;
                if (data[0].conteo == 1) {
                    this.postAceptarSolicitud(form);
                    this.putCantidadUsuarios(form.id_clase);
                    this.deleteNotificacion(form2);
                } else {
                    this.Modal1(true, "El usuario que envió esta notificación la cancelo.");
                }
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este metodo sirve para rechazar una notificación en recibidos*/
    RechazarNotifi = async (Notification) => {
        let form2;
        if (Notification.tipo_notificacion == 0) {
            form2 = {
                id_clase: Notification.id_clase,
                id_creador_clase: UsuarioI[0].id_usuario,
                id_otro_usuario: Notification.id_otro_usuario
            }
        } else {
            form2 = {
                id_clase: Notification.id_clase,
                id_creador_clase: Notification.id_creador_clase,
                id_otro_usuario: UsuarioI[0].id_usuario
            }
        }
        await axios.get(`http://localhost:3883//get-notificaciones-length/clases/${form2.id_clase}&${form2.id_creador_clase}&${form2.id_otro_usuario}`)
            .then(res => {
                let data = res.data;
                if (data[0].conteo == 1) {
                    this.deleteNotificacion(form2);
                } else {
                    this.Modal1(true, "El usuario que envió esta notificación la cancelo.");
                }
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este metodo sirve para cancelar una notificación enviada*/
    CancelarNotifi = async (Notification) => {
        let form2;
        if (Notification.tipo_notificacion == 0) {
            form2 = {
                id_clase: Notification.id_clase,
                id_creador_clase: Notification.id_creador_clase,
                id_otro_usuario: UsuarioI[0].id_otro_usuario
            }
        } else {
            form2 = {
                id_clase: Notification.id_clase,
                id_creador_clase: UsuarioI[0].id_usuario,
                id_otro_usuario: Notification.id_otro_usuario
            }
        }
        await axios.get(`http://localhost:3883//get-notificaciones-length/clases/${form2.id_clase}&${form2.id_creador_clase}&${form2.id_otro_usuario}`)
            .then(res => {
                let data = res.data;
                if (data[0].conteo == 1) {
                    this.deleteNotificacion(form2);
                } else {
                    this.Modal1(true, "El usuario que recibió la notificación ya la respondió.");
                }
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Modal1*/
    Modal1 = (prop, prop2) => {
        this.setState({
            Modal1: {
                return: prop,
                title: prop2
            }
        });
    }
    modal1Return = () => {
        if (this.state.Modal1.return) {
            return (
                <>
                    <div className="ModalFondo">
                        <div className="Modal1">
                            <div className="ModalTitle">
                                <h2>{this.state.Modal1.title}</h2>
                            </div>
                            <div className="RangeNumber">
                                <input type="range" step="0.1" className="slider" id="num" min="1" max="5" defaultValue="1" onInput={() => this.cos1()} />
                                <input type="text" disabled className="numberModal1" id="con1" value="1" />
                            </div>
                            <button className="button buttonModal1" onClick={this.Modal1(false, "")}>Aceptar</button>

                        </div>
                    </div>
                </>
            );
        }
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                {this.modal1Return()}
                <div className="Main10Container">
                    <div className="Main10Switch">

                        <button className={"botonMain10 " + this.default(1)} id="RecibidosNoti" onClick={() => { this.filtrado(1) }}>Recibidos</button>
                        <button className={"botonMain10 " + this.default(2)} id="EnviadosNoti" onClick={() => { this.filtrado(2) }}>Enviados</button>
                    </div>
                    <div className="Main10Contain">
                        {this.state.filtrado?.map((Esito, index) => {
                            if (this.state.color == 1) {
                                return (
                                    <>
                                        <div key={index} className="CardRecibidos">
                                            <p className="PCard">{this.textRecibidos(Esito)}</p>
                                            <div className="PCard2">
                                                <button className="bCard" onClick={() => this.AceptarNotifi(Esito)}>Aceptar</button>
                                                <button className="bCard" onClick={() => this.RechazarNotifi(Esito)}>Rechazar</button>
                                            </div>
                                        </div>
                                    </>
                                );
                            } else if (this.state.color == 2) {
                                return (
                                    <>
                                        <div className="CardRecibidos">
                                            <p className="PCard3">{this.textEnviados(Esito)}</p>
                                            <div className="PCard4">
                                            <button className="bCard2" onClick={() => this.CancelarNotifi(Esito)}>Cancelar</button>
                                            </div>
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