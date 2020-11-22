import React from 'react';
import '../Styles/Perfil.css';
import Header from '../Components/Header1';
import Footer from '../Components/Footer';
import axios from 'axios';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Link, Redirect, withRouter } from 'react-router-dom';
let Fecha = new Date();
let FechaY = Fecha.getFullYear();
let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
let FechaH = FechaY + "-" + FechaM + "-" + FechaD;
let FechaMin = (FechaY - 100) + "-" + FechaM + "-" + FechaD;
let Sesion, aja2;

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Ola: true,
            UserB: false,
            UserB2: false,
            ConB: false,
            ConB2: false,
            Bool: false,
            Fecha2: "",
            Modal1: false
        }
    }
    componentDidMount() {
        let avatar = '';
        if (UsuarioI[0].avatar == null) {
            avatar = 'https://1.bp.blogspot.com/-p-TNqGEoS5w/X1PrFJ6rBYI/AAAAAAAAPQU/cgfqUztLg1YJL0zxyfRp8sEkhWGsymFUwCLcBGAsYHQ/s16000/Perf%25C3%25ADlLogo.png'
        } else {
            avatar = UsuarioI[0].avatar;
        }
        document.getElementById("FotoPerfíl").style.backgroundImage = "url(" + avatar + ")";
    }
    componentWillMount() {
        Sesion = false;
        try {
            let x = (UsuarioI[0].fecha_n).getFullYear();
        }
        catch (e) {
            Sesion = true;
        }
        this.FechaFormat();
    }
    /*ESTA FUNCIOÓN SIRVE PARA CAMBIAR EL FORMATO DE LA FECHA Y PODER PINTARLA*/
    FechaFormat = () => {
        this.setState({ Fecha2: (UsuarioI[0].fecha_n).getFullYear() + "-" + ((UsuarioI[0].fecha_n).getMonth() + 1) + "-" + (UsuarioI[0].fecha_n).getDate() });
    }
    /*EDICIÓN DE INFORMACIÓN*/
    /*Esta función habilita la posibilidad de editar información.*/
    Edit = () => {
        document.getElementById("GroupIP2").style.display = "flex";
        let ArreClas = document.getElementsByClassName("Apar");
        let ArreClas2 = document.getElementsByClassName("PInfo2");
        let ArreClas3 = document.getElementsByClassName("Edit");
        document.getElementById("EdadDisPar").style.display = "none";
        document.getElementById("classBotonConfirPerfil").style.display = "block";
        for (let i = 0; i < ArreClas.length; i++) {
            ArreClas[i].style.display = "block";
        } for (let i = 0; i < ArreClas2.length; i++) {
            ArreClas2[i].style.display = "none";
        }
        for (let i = 0; i < ArreClas3.length; i++) {
            ArreClas3[i].style.opacity = "0";
            ArreClas3[i].style.cursor = "default";
        }
        this.setState({ Ola: true });
    }
    /*Esta función comprueba y realiza la actualización de información*/
    Edit2 = () => {
        /*
        let Contraseña = document.getElementById("CP"), Contraseña2 = document.getElementById("CP2");
        let Nombre = document.getElementById("NP"), Apellido = document.getElementById("AP");
        let User = document.getElementById("UP"), correo = document.getElementById("EP");
        let Sexo = document.getElementById("SP"), FechaN = document.getElementById("FP");
        let edad = new Date(FechaN.value);
        let tD = edad.getDate() + 1;
        let tM = edad.getMonth() + 1;
        let tY = edad.getFullYear();
        let ttD = Fecha.getDate() + 1;
        let ttM = Fecha.getMonth() + 1;
        let ttY = Fecha.getFullYear();
        let años;
        if (tM == ttM) {
            if (tD <= ttD) {
                años = ttY - tY;
            } else {
                años = ttY - tY - 1;
            }
        }
        else if (tM < ttM) {
            años = ttY - tY;
        }
        else {
            años = ttY - tY - 1;
        }

        this.setState({ UserB: false, UserB2: false });
        if (User.value != UsuarioI[0].usuario) {
            if (this.state.UserB == false) {
                axios.get(`http://localhost:3883/Usu/usuario-sesion/${User.value}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            User.style.color = "red";
                            User.value = "Usuario invalido";
                            this.Time(User, "text");
                        } else {
                            this.setState({ UserB: true });
                        }
                    }).catch(err => {
                        console.error(err);
                    });
            }
        } else {
            User.style.color = "red";
            User.value = "Este ya es tu usuario";
            this.Time(User, "text");
        }

        if (correo.value != UsuarioI[0].correo) {
            if (this.state.UserB2 == false) {
                axios.get(`http://localhost:3883/Usu/correo-sesion/${correo.value}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            correo.style.color = "red";
                            correo.value = "Correo invalido";
                            this.Time(correo, "text");
                        } else {
                            this.setState({ UserB2: true });
                        }
                    }).catch(err => {
                        console.error(err);
                    });
            }
        } else {
            correo.style.color = "red";
            correo.value = "Este ya es tu correo";
            this.Time(correo, "text");
        }
        if (this.state.UserB && this.state.UserB2) {
            
            if (Contraseña.value != "" && Contraseña2.value != "") {
                if (Contraseña.value == Contraseña2.value) {
                    Usuarios[UsuarioI[0].id_usuario].contraseña = Contraseña.value;
                    UsuarioI[0].contraseña = Usuarios[UsuarioI[0].id_usuario].contraseña;
                }
            }
            if (Nombre.value != "") {
                Usuarios[UsuarioI[0].id_usuario].nombre = Nombre.value;
                UsuarioI[0].nombre = Usuarios[UsuarioI[0].id_usuario].nombre;
            }
            if (Apellido.value != "") {
                Usuarios[UsuarioI[0].id_usuario].apellido = Apellido.value;
                UsuarioI[0].apellido = Usuarios[UsuarioI[0].id_usuario].apellido;
            }
            if (User.value != "" && this.state.UserB) {
                Usuarios[UsuarioI[0].id_usuario].usuario = User.value;
                UsuarioI[0].usuario = Usuarios[UsuarioI[0].id_usuario].usuario;
            }
            if (correo.value != "") {
                Usuarios[UsuarioI[0].id_usuario].correo = correo.value;
                UsuarioI[0].correo = Usuarios[UsuarioI[0].id_usuario].correo;
            }
            if (Sexo.value != 0) {
                Usuarios[UsuarioI[0].id_usuario].genero = Sexo.value;
                UsuarioI[0].genero = Usuarios[UsuarioI[0].id_usuario].genero;
            }
            if (FechaN.value != "") {
                Usuarios[UsuarioI[0].id_usuario].fecha_n = new Date(edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1));
                Usuarios[UsuarioI[0].id_usuario].edad = años;
                UsuarioI[0].fecha_n = Usuarios[UsuarioI[0].id_usuario].fecha_n;
                UsuarioI[0].edad = Usuarios[UsuarioI[0].id_usuario].edad;
            }
            
            document.getElementById("GroupIP2").style.display = "none";
            let ArreClas = document.getElementsByClassName("Apar");
            let ArreClas2 = document.getElementsByClassName("PInfo2");
            let ArreClas3 = document.getElementsByClassName("Edit");
            document.getElementById("EdadDisPar").style.display = "flex";
            document.getElementById("classBotonConfirPerfil").style.display = "none";
            for (let i = 0; i < ArreClas.length; i++) {
                ArreClas[i].style.display = "none";
            } for (let i = 0; i < ArreClas2.length; i++) {
                ArreClas2[i].style.display = "block";
            }
            for (let i = 0; i < ArreClas3.length; i++) {
                ArreClas3[i].style.opacity = "1";
            }

            this.setState({ Ola: false });
            
        }*/
    }
    /*ESTA FUNCIÓN CIERRA LA SESIÓN ACTUAL DEL USUARIO*/
    Borrartusdatos = () => {
        UsuarioI.splice(0, 1);
    }
    /*MODAL1*/
    /*Esta función activa o desactiva el modal*/
    Modal1 = () => {
        this.setState({ Modal1: !this.state.Modal1 })
    }
    /*Esta función returna o no el Modal1*/
    Modal1Return = () => {
        if (this.state.Modal1) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp">
                            <form id="formProta" encType="multipart/form-data">
                                <input id="Elprota" accept="image/*" onChange={this.Subir} type="file" />
                            </form>
                            <img id="PrevImg" className="PrevImg" />
                            <div className="BotonesCont">
                                <Link className="SubImg" to={{
                                    pathname: "/Perfíl",
                                    state: { x: this.props.location.state.x }
                                }}>
                                    <button className="button SubImg2" onClick={() => { this.Subir2(); this.Modal1() }}>Subir</button>
                                </Link>
                                <button className="button SubImg2" onClick={this.Modal1}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*ACTUALIZAR AVATAR*/
    /*Esta función realiza la vista previa de la foto de perfíl*/
    Subir = () => {
        let inpu = document.getElementById("Elprota");
        if (inpu.files && inpu.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("PrevImg").src = e.target.result;
                aja2 = e.target.result;
            }
            reader.readAsDataURL(inpu.files[0]);
        }
    }
    /*Esta funcion actualiza el avatar del usuario.*/
    Subir2 = async () => {
        let inpu = document.getElementById("Elprota");
        if (inpu.files && inpu.files[0]) {
            await this.putAvatar();
            UsuarioI[0].avatar = aja2;
            document.getElementById("FotoPerfíl").style.backgroundImage = "url(" + UsuarioI[0].avatar + ")";
        }
    }
    /*Funcion timer*/
    Time = (Propi, Propi2) => {
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.value = "";
        }, 1500)
    }
    /*Retorno del botón atrás dependiendo desde la cual se accedió.*/
    Accion1 = () => {
        if (this.props.location.state.x == "/Principal_") {
            if (this.props.location.state.pagina == "undefined") {
                return (
                    <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x2 } }}>
                        <button className="BP">Atrás</button>
                    </Link>
                );
            } else {
                return (
                    <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x2, pagina: this.props.location.state.x3 } }}>
                        <button className="BP">Atrás</button>
                    </Link>
                );

            }

        } else if (this.props.location.state.x != "/Integrados") {
            return (
                <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x } }}>
                    <button className="BP">Atrás</button>
                </Link>
            );
        } else {
            return (
                <Link className="BP" to={{ pathname: this.props.location.state.x, state: { x: this.props.location.state.x, pagina: this.props.location.state.x3 } }}>
                    <button className="BP">Atrás</button>
                </Link>
            );

        }
    }
    /*TODOS LOS AXIOS*/
    /*PUTS*/
    putAvatar = () => {
        let form = {
            avatar: aja2 + ""
        }
        axios.put(`http://localhost:3883/Usu/actualizacion-perfil/imagen/${UsuarioI[0].id_usuario}`, form)
            .then(res => {

            }).catch(err => {
                console.error(err);
            })
    }
    render() {
        return (
            <>
                {this.Modal1Return()}
                <Header />
                <div className="centrar">
                    <div id="PerfilContainer">
                        <div id="FotoContainer">
                            <div id="FotoAndEC">
                                <div id="FotoPerfíl" onClick={this.Modal1}>

                                </div>
                            </div>
                        </div>
                        <div id="InfoPContainer">
                            <div className="GroupIP">
                                <p className="PInfo">Nombre:</p>
                                <input className="None Apar PInfo" id="NP" type="text" placeholder={UsuarioI[0].nombre} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].nombre}</p>
                                <div className="Edit" id="NPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Apellido:</p>
                                <input className="None Apar PInfo" id="AP" type="text" placeholder={UsuarioI[0].apellido} autoComplete="off" />
                                <p className="PInfo PInfo2"> {UsuarioI[0].apellido}</p>
                                <div className="Edit" id="APEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Usuario:</p>
                                <input className="None Apar PInfo" id="UP" type="text" placeholder={UsuarioI[0].usuario} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].usuario}</p>
                                <div className="Edit" id="UPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Correo:</p>
                                <input className="None Apar PInfo" id="EP" type="email" placeholder={UsuarioI[0].correo} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].correo}</p>
                                <div className="Edit" id="EPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Contraseña:</p>
                                <input className="None Apar PInfo" id="CP" type="password" autoComplete="off" />
                                <input className="PInfo PInfo2 PINFOCONTRASEÑA" type="password" disabled value={UsuarioI[0].contraseña} />
                                <div className="Edit" id="CPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div id="GroupIP2">
                                <p className="PInfo">Confirmar Contraseña:</p>
                                <input className="None Apar PInfo" id="CP2" type="password" autoComplete="off" />
                                <div className="Edit" id="CP2EDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Sexo:</p>
                                <select className="None Apar PInfo" id="SP">
                                    <option className="None" value="0">Sexo</option>
                                    <option value="Hombre">Hombre</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <p className="PInfo PInfo2">{UsuarioI[0].genero}</p>
                                <div className="Edit" id="SPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Fecha de nacimiento:</p>
                                <input className="None Apar PInfo" id="FP" type="date" max={FechaH} min={FechaMin} autoComplete="off" />
                                <p className="PInfo PInfo2">{this.state.Fecha2}</p>
                                <div className="Edit" id="FPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP" id="EdadDisPar">
                                <p className="PInfo">Edad:</p>
                                <p className="PInfo">{UsuarioI[0].edad}</p>
                                <div className="Edit2" id="EDEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <button id="classBotonConfirPerfil" className="button" onClick={this.Edit2}>Confirmar</button>
                            {this.state.Bool && <Redirect to={{ pathname: this.props.location.state.x, x: this.props.location.state.x }}></Redirect>}
                        </div>
                        <div id="ButtonPContainer">
                            {this.Accion1()}

                            <Link className="BP" to="/">
                                <button className="BP" onClick={this.Borrartusdatos}>Cerrar sesión</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
                {Sesion && <Redirect to="/" />}
            </>
        );
    }

}

export default withRouter(Perfil);