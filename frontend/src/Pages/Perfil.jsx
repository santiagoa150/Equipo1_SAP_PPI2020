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
            UserB: false,
            UserB2: false,
            ConB: false,
            ConB2: false,
            Bool: false,
            Fecha2: "",
            Modal1: false,
            Modal2: false,
            renderizar: false,
            boolUser: false
        }
    }
    componentDidMount() {
        let avatar = '';
        if (UsuarioI[0]?.avatar == null) {
            avatar = 'https://1.bp.blogspot.com/-p-TNqGEoS5w/X1PrFJ6rBYI/AAAAAAAAPQU/cgfqUztLg1YJL0zxyfRp8sEkhWGsymFUwCLcBGAsYHQ/s16000/Perf%25C3%25ADlLogo.png'
        } else {
            avatar = UsuarioI[0]?.avatar;
        }
        document.getElementById("FotoPerfíl").style.backgroundImage = "url(" + avatar + ")";
    }
    componentWillMount() {
        Sesion = false;
        try {
            let x = (UsuarioI[0]?.fecha_n).getFullYear();
        }
        catch (e) {
            Sesion = true;
        }
        this.FechaFormat();
    }
    /*ESTA FUNCIOÓN SIRVE PARA CAMBIAR EL FORMATO DE LA FECHA Y PODER PINTARLA*/
    FechaFormat = () => {
        this.setState({ Fecha2: (UsuarioI[0]?.fecha_n).getFullYear() + "-" + ((UsuarioI[0]?.fecha_n).getMonth() + 1) + "-" + (UsuarioI[0]?.fecha_n).getDate() });
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
    }
    /*Esta función comprueba y realiza la actualización de información*/
    Edit2 = async () => {
        this.setState({ renderizar: false });
        let form = {
            nombre: UsuarioI[0]?.nombre,
            apellido: UsuarioI[0]?.apellido,
            genero: UsuarioI[0]?.genero,
            fecha_n: UsuarioI[0]?.fecha_n.getFullYear() + "-" + (UsuarioI[0]?.fecha_n.getMonth() + 1) + "-" + (UsuarioI[0]?.fecha_n.getDate() + 1),
            edad: UsuarioI[0]?.edad,
            usuario: UsuarioI[0]?.usuario,
            contraseña: UsuarioI[0]?.contraseña,
            correo: UsuarioI[0]?.correo
        }
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
        if (User.value != "") {
            if (User.value.toLowerCase() != UsuarioI[0]?.usuario.toLowerCase()) {
                if (this.state.UserB == false) {
                    console.log("No debería 1")
                    await this.getUsuarioUserName(User);
                }
            } else {
                this.Time(User, "text", "Este ya es tu usuario");
            }
        } else {
            await this.setState({
                UserB: true,
            })
        }
        if (correo.value != "") {
            if (correo.value != UsuarioI[0]?.correo) {
                let regular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (regular.test(correo.value)) {
                    if (this.state.UserB2 == false) {
                        console.log("No debería");
                        await this.getUsuarioCorreo(correo);
                    }
                } else {
                    this.Time(correo, "text", "Correo invalido")
                }
            } else {
                this.Time(correo, "text", "Este ya es tu correo");
            }
        } else {
            await this.setState({
                UserB2: true,
            })
        }
        if (this.state.UserB && this.state.UserB2) {
            if (Contraseña.value != "" && Contraseña2.value != "") {
                if (Contraseña.value == Contraseña2.value) {
                    if (Contraseña.value != UsuarioI[0]?.contraseña) {
                        UsuarioI[0].contraseña = Contraseña.value;
                        form.contraseña = Contraseña.value;
                    } else {
                        this.Time(Contraseña2, "password", "Esta ya es tu contraseña.");
                    }
                }
            } else {
                if (Contraseña.value != "" && Contraseña2.value == "") {
                    this.Time(Contraseña2, "password", "Dato sin llenar.");
                }
                if (Contraseña2.value != "" && Contraseña.value == "") {
                    this.Time(Contraseña, "password", "Dato sin llenar.");
                }
            }
            if (Nombre.value != "") {
                UsuarioI[0].nombre = Nombre.value;
                form.nombre = Nombre.value;
            }
            if (Apellido.value != "") {
                UsuarioI[0].apellido = Apellido.value;
                form.apellido = Apellido.value;
            }
            if (User.value != "" && this.state.UserB) {
                UsuarioI[0].usuario = User.value;
                form.usuario = User.value;
            }
            if (correo.value != "" && this.state.UserB2) {
                UsuarioI[0].correo = correo.value;
                form.correo = correo.value;
            }
            if (Sexo.value != "none") {
                UsuarioI[0].genero = Sexo.value;
                form.genero = Sexo.value;
            }
            if (FechaN.value != "") {
                UsuarioI[0].fecha_n = new Date(edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1));
                UsuarioI[0].edad = años;
                form.fecha_n = edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1);
                form.edad = años;
            }
            if (Nombre.value != "" || Apellido.value != "" || Sexo.value != 0 || FechaN.value != "" || User.value != "" || Contraseña.value != "" || correo.value != "") {
                if (Contraseña.value == Contraseña2.value) {
                    await this.putInformacion(form);
                }
            }
            Nombre.value = "";
            Apellido.value = "";
            Contraseña.value = "";
            Contraseña2.value = "";
            Sexo.value = "none";
            FechaN.value = "";
            correo.value = "";
            User.value = "";
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
                ArreClas3[i].style.cursor = "pointer";
            }
        }
    }
    /*ESTA FUNCIÓN CIERRA LA SESIÓN ACTUAL DEL USUARIO*/
    Borrartusdatos = () => {
        UsuarioI.splice(0, 1);
    }
    /*MODAL1*/
    /*Esta función activa o desactiva el modal*/
    Modal2 = () => {
        this.setState({ Modal2: !this.state.Modal2 })
    }
    /*Esta función returna o no el Modal1*/
    Modal2Return = () => {
        if (this.state.Modal2) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div className="Modal1">
                            <div className="ModalTitle">
                                <h2>¿Estas seguro de que quieres eliminar tu cuenta?</h2>
                            </div>
                            <button className="button SubImg2 BotonPerfil" onClick={() => { this.deleteUser() }}>Aceptar</button>
                            <button className="button SubImg2 BotonPerfil" onClick={() => this.Modal2()}>Cancelar</button>
                        </div>
                    </div>
                </>
            );
        }
    }
    deleteUser = async () => {
        axios.delete(`https://learnwithus2020.herokuapp.com/Usu/deleteUsuario/${UsuarioI[0]?.id_usuario}`)
            .then(res => {
                UsuarioI.splice(0, 1);
                this.setState({
                    boolUser: true
                })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
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
                            <div className="TitleModal1Perfíl">
                                <h2>Cambia tu foto</h2>
                            </div>
                            <div className="MainModal1Perfíl">
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
                aja2 = e.target.result;
                document.getElementById("body").innerHTML = "<canvas id='tempCanvas' width='300' height='300' style='display:none'></canvas>";
                var canvas = document.getElementById("tempCanvas");
                var ctx = canvas.getContext("2d");
                var cw = canvas.width;
                var ch = canvas.height;
                var maxW = 300;
                var maxH = 300;
                var img = new Image;
                img.src = this.result;
                img.onload = function () {
                    var iw = img.width;
                    var ih = img.height;
                    if (ih > 300 || iw > 300) {
                        var scale = Math.min((maxW / iw), (maxH / ih));
                        var iwScaled = iw * scale;
                        var ihScaled = ih * scale;
                        canvas.width = iwScaled;
                        canvas.height = ihScaled;
                        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
                        aja2 = canvas.toDataURL("image/jpeg");
                        console.log(canvas.toDataURL("image/jpeg"));
                        document.getElementById("tempCanvas").remove();
                    }
                }
                document.getElementById("PrevImg").src = aja2;
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
            document.getElementById("FotoPerfíl").style.backgroundImage = "url(" + UsuarioI[0]?.avatar + ")";
        }
    }
    /*Funcion timer*/
    Time = (Propi, Propi2, Propi3) => {
        Propi.type = "text";
        Propi.style.color = "red";
        Propi.style.border = "2px solid #ff595e";
        Propi.value = Propi3;
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.style.border = "1px solid black";
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
    /*Este put actualiza el avatar del usuario.*/
    putAvatar = () => {
        let form = {
            avatar: aja2 + ""
        }
        axios.put(`https://learnwithus2020.herokuapp.com/Usu/actualizacion-perfil/imagen/${UsuarioI[0]?.id_usuario}`, form)
            .then(res => {

            }).catch(err => {
                console.error(err);
            })
    }
    /*Este put actualiza la información del usuario.*/
    putInformacion = async (form) => {
        await axios.put(`https://learnwithus2020.herokuapp.com/Usu/actualizacion-perfil/datos/${UsuarioI[0]?.id_usuario}`, form)
            .then(res => {
                this.setState({ renderizar: true });
            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    }
    /*GETS*/
    /*Este get nos trae la información de un usaurio dependiendo de su UserName*/
    getUsuarioUserName = async (User) => {
        await axios.get(`https://learnwithus2020.herokuapp.com/Usu/usuario-sesion/${User.value}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.Time(User, "text", "Usuario invalido");
                } else {
                    this.setState({
                        UserB: true,
                    });
                }
            }).catch(err => {
                console.error(err);
            });
    }
    /*Este get nos trae*/
    getUsuarioCorreo = async (correo) => {
        await axios.get(`https://learnwithus2020.herokuapp.com/Usu/correo-sesion/${correo.value}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.Time(correo, "text", "Correo invalido");
                } else {
                    this.setState({ UserB2: true });
                }
            }).catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <>
                {this.state.boolUser && <Redirect to="/" />}
                {this.Modal1Return()}
                {this.Modal2Return()}
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
                                <input className="None Apar PInfo" id="NP" type="text" placeholder={UsuarioI[0]?.nombre} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0]?.nombre}</p>
                                <div className="Edit" id="NPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Apellido:</p>
                                <input className="None Apar PInfo" id="AP" type="text" placeholder={UsuarioI[0]?.apellido} autoComplete="off" />
                                <p className="PInfo PInfo2"> {UsuarioI[0]?.apellido}</p>
                                <div className="Edit" id="APEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Usuario:</p>
                                <input className="None Apar PInfo" id="UP" type="text" placeholder={UsuarioI[0]?.usuario} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0]?.usuario}</p>
                                <div className="Edit" id="UPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Correo:</p>
                                <input className="None Apar PInfo" id="EP" type="email" placeholder={UsuarioI[0]?.correo} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0]?.correo}</p>
                                <div className="Edit" id="EPEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Contraseña:</p>
                                <input className="None Apar PInfo" id="CP" type="password" autoComplete="off" />
                                <input className="PInfo PInfo2 PINFOCONTRASEÑA" type="password" disabled value={UsuarioI[0]?.contraseña} />
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
                                    <option className="None" value="none">Sexo</option>
                                    <option value="Masculino">Hombre</option>
                                    <option value="Femenino">Mujer</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <p className="PInfo PInfo2">{UsuarioI[0]?.genero}</p>
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
                                <p className="PInfo">{UsuarioI[0]?.edad}</p>
                                <div className="Edit2" id="EDEDIT" onClick={this.Edit}>

                                </div>
                            </div>
                            <button id="classBotonConfirPerfil" className="button" onClick={this.Edit2}>Confirmar</button>
                            {this.state.Bool && <Redirect to={{ pathname: this.props.location.state.x, x: this.props.location.state.x }}></Redirect>}

                        </div>
                        <div id="ButtonPContainer">
                            {this.Accion1()}

                            <Link className="BP" to="/">
                                <button className="BP" onClick={() => this.Borrartusdatos()}>Cerrar sesión</button>
                            </Link>
                            <div className="BP">
                                <button className="BP" onClick={() => this.Modal2()}>Eliminar cuenta</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="None" id="body">

                </div>
                <Footer />
                {Sesion && <Redirect to="/" />}
            </>
        );
    }

}

export default withRouter(Perfil);