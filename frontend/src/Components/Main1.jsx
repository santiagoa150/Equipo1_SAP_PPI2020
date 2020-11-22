import React from 'react';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import axios from 'axios';
import '../Styles/Main1.css';
import { Redirect } from 'react-router-dom';

let Fecha = new Date();
let FechaY = Fecha.getFullYear();
let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
let FechaH = FechaY + "-" + FechaM + "-" + FechaD;
let FechaMin = (FechaY - 100) + "-" + FechaM + "-" + FechaD;
class Main1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Tipo: "",
            Bool: false,
            UserB: false,
            UserB2: false,
            ConB2: false,
            data: [],
        }
    }
    /*METODOS DE LOS MODALES EN COMPUTADOR Y TELÉFONO*/
    RegistrarCom = () => {
        document.getElementById("GridCom2Div2").style.display = "block";
        document.getElementById("LogoInicialC").style.display = "none";
        document.getElementById("GridCom2Div3").style.display = "none";
    }
    IniciarCom = () => {
        document.getElementById("GridCom2Div2").style.display = "none";
        document.getElementById("LogoInicialC").style.display = "none";
        document.getElementById("GridCom2Div3").style.display = "flex";
    }
    RegistrarCel = () => {
        document.getElementById("RegistroCel").style.display = "flex";
        document.getElementById("InicioCel").style.display = "none";
    }
    IniciarCel = () => {
        document.getElementById("RegistroCel").style.display = "none";
        document.getElementById("InicioCel").style.display = "flex";
    }
    Close = () => {
        document.getElementById("RegistroCel").style.display = "none";
        document.getElementById("InicioCel").style.display = "none";
    }
    /*REGISTRO DE USUARIO*/
    /*Registro de usuario en computador*/
    RegistrarUsuCom = () => {
        let Comp = "Comp";
        let Nombre = document.getElementById("NRC"), Apellido = document.getElementById("ARC");
        let UserName = document.getElementById("DRC"), Correo = document.getElementById("CRC");
        let Sexo = document.getElementById("SRC"), Edad = document.getElementById("ERC");
        let Contraseña = document.getElementById("CoRC"), Contraseña2 = document.getElementById("Co2RC");
        this.RegistroGlobal(Nombre, Apellido, UserName, Correo, Sexo, Edad, Contraseña, Contraseña2, Comp);
    }
    /*Registro de usuario en celular*/
    RegistrarUsuCel = () => {
        let Cel = "Cel";
        let Nombre = document.getElementById("NRCe");
        let Apellido = document.getElementById("ARCe");
        let UserName = document.getElementById("DRCe");
        let Correo = document.getElementById("CRCe");
        let Sexo = document.getElementById("SRCe"), Edad = document.getElementById("ERCe");
        let Contraseña = document.getElementById("CoRCe"), Contraseña2 = document.getElementById("Co2RCe");
        this.RegistroGlobal(Nombre, Apellido, UserName, Correo, Sexo, Edad, Contraseña, Contraseña2, Cel);
    }
    /*Registro de usuario global*/
    RegistroGlobal = async (Nombre, Apellido, UserName, Correo, Sexo, Edad, Contraseña, Contraseña2, tipe) => {
        let edad = new Date(Edad.value);
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
        if (Nombre.value != "" && Apellido.value != "" && UserName.value != "" && Correo.value != "" && Edad.value != "" && Contraseña.value != "" && Contraseña2.value != "") {
            this.state.UserB = false; this.state.UserB2 = false;
            if (this.state.UserB == false) {
                await this.getUserNameRegistro(UserName);
            }
            if (this.state.UserB2 == false) {
                await this.getCorreoRegistro(Correo);
            }
            if (Contraseña.value == Contraseña2.value) {
                if (this.state.UserB && this.state.UserB2) {
                    let form = {
                        nombre: Nombre.value,
                        apellido: Apellido.value,
                        genero: Sexo.value,
                        fecha_n: edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1),
                        edad: años,
                        usuario: UserName.value,
                        contraseña: Contraseña.value,
                        correo: Correo.value,
                        registro_sistema: 1
                    }
                    await this.postUser(form);
                    Nombre.value = "";
                    Apellido.value = "";
                    UserName.value = "";
                    Correo.value = "";
                    Edad.value = "";
                    Contraseña.value = "";
                    Contraseña2.value = "";
                    if(tipe == "Comp"){
                        this.IniciarCom();
                    }else{
                        this.IniciarCel();
                    }
                }
            }
            /*Datos errados en el registro*/
        } else {
            if (Nombre.value == "") {
                this.Time(Nombre, "text", "Dato no ingresado.");
            } if (Apellido.value == "") {
                this.Time(Apellido, "text", "Dato no ingresado.");
            } if (UserName.value == "") {
                this.Time(UserName, "text", "Dato no ingresado.");
            } if (Correo.value == "") {
                this.Time(Correo, "email", "Dato no ingresado.")
            } if (Edad.value == "") {
                this.Time(Edad, "date", "Dato no ingresado.");
            } if (Contraseña.value == "") {
                this.Time(Contraseña, "password", "Dato no ingresado.")
            } if (Contraseña2.value == "") {
                this.Time(Contraseña2, "password", "Dato no ingresado.");
            }
        }

    }
    /*INICIO DE SESIÓN DE USUARIO*/
    /*Inicio de sesión en computador*/
    IniciarSCom = () => {
        let Usuario = document.getElementById("IUC");
        let Contraseña = document.getElementById("ICC");
        if (Usuario.value != "" && Contraseña.value != "") {
            this.getUserNameInicioSesion(Usuario, Contraseña);
        } else {
            if (Usuario.value == "") {
                this.Time(Usuario, "text", "Dato no ingresado.");
            } if (Contraseña.value == "") {
                this.Time(Contraseña, "password", "Dato no ingresado.");
            }
        }
    }
    /*Inicio de sesión en celular*/
    IniciarSCel = () => {
        let Usuario = document.getElementById("IUCel");
        let Contraseña = document.getElementById("ICCel");
        if (Usuario.value != "" && Contraseña.value != "") {
            this.getUserNameInicioSesion(Usuario, Contraseña);
        } else {
            if (Usuario.value == "") {
                this.Time(Usuario, "text", "Dato no ingresado.");
            } if (Contraseña.value == "") {
                this.Time(Contraseña, "password", "Dato no ingresado.");
            }
        }
    }
    /*Inicio de sesión global*/
    IniciarSGlobal = async (Usuario, Contraseña) => {
        if (this.state.data.length == 0) {
            this.Time(Usuario, "text", "El usuario no existe");
        } else {
            if (this.state.data[0].contraseña == Contraseña.value && this.state.data[0].registro_sistema == 1) {
                let edad = new Date(this.state.data[0].fecha_n);
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
                if(this.state.data[0].edad != años){
                    await this.putEdad(años);
                }
                UsuarioI.push({
                    id_usuario: this.state.data[0].id_usuario,
                    nombre: this.state.data[0].nombre,
                    apellido: this.state.data[0].apellido,
                    genero: this.state.data[0].genero,
                    fecha_n: new Date(this.state.data[0].fecha_n),
                    edad: años,
                    avatar: this.state.data[0].avatar,
                    usuario: this.state.data[0].usuario,
                    contraseña: this.state.data[0].contraseña,
                    correo: this.state.data[0].correo,
                    registro_sistema: this.state.data[0].registro_sistema
                }
                );
                this.setState({ Bool: true });
            } else {
                this.Time(Contraseña, "password", "La contraseña no coincide.");
            }
        }
    }
    /*TIMER PARA ALERTAS Y DATOS ERRADOS*/
    Time = (Propi, Propi2, Propi3) => {
        Propi.type = "text";
        Propi.style.color = "red";
        Propi.value = Propi3;
        Propi.style.border = "2px solid #ff595e";
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.value = "";
            Propi.style.border = "1px solid black";
        }, 1500)
    }
    /*TODOS LOS AXIOS*/
    /*TODOS LOS GETS*/
    /*Axio para traer un usuario por su UserName // Este se utiliza en el registro*/
    getUserNameRegistro = async (UserName) => {
        const response = await axios.get(`http://localhost:3883/Usu/usuario-sesion/${UserName.value}`)
        if (response.length > 0) {
            this.Time(UserName, "text", "Usuario invalido");
        } else {
            this.setState({ UserB: true });
        }
    }
    /*Axio para traer un usuario por su Correo*/
    getCorreoRegistro = async (Correo) => {
        const response = await axios.get(`http://localhost:3883/Usu/correo-sesion/${Correo.value}`)
        if (response.length > 0) {
            this.Time(Correo, "text", "Usuario invalido");
        } else {
            this.setState({ UserB2: true });
        }
    }
    /*Axio para traer un usuario por su UserName // Este se utiliza en el inicio de sesión*/
    getUserNameInicioSesion = async (Usuario, Contraseña) => {
        await axios.get(`http://localhost:3883/Usu/usuario-sesion/${Usuario.value.toLowerCase()}`)
            .then(res => {
                this.setState({ data: res.data });
                this.IniciarSGlobal(Usuario, Contraseña);
            }).catch(err => {
                console.log(err.massage);
            })
    }
    /*TODOS LOS POST*/
    /*Axio que registra a un usuario en el sistema*/
    postUser = async (form) => {
        console.log("ola: " + form);
        await axios.post(`http://localhost:3883/Usu/registro-sesion`, form)
            .then(res => {

            }).catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    }
    /*TODOS LOS PUT*/
    /*Axio que actualiza la edad de un usuario al entrar al sistema*/
    putEdad = (edad) =>{
        let form={
            edad:edad
        }
        axios.put(`http://localhost:3883/Usu/put-usuarios-edad/${this.state.data[0].id_usuario}`, form);
    }
    render() {
        return (
            <>
                {/*Inicio de sesión en celular*/}
                <div id="InicioCel">
                    <div id="InicioCel2">
                        <div id="XimageC">
                            <img id="Ximage" onClick={this.Close} src="https://images.vexels.com/media/users/3/155473/isolated/preview/faa3172dd52035d0c227d7ecab4d6024-doodle-cruzado-x-by-vexels.png" />
                        </div>
                        <div className="GridCom2Div1">
                            <h2 id="TitleReg">Iniciar Sesión</h2>
                        </div>
                        <div id="GridCom2Div3_">
                            <p>Usuario</p>
                            <input className="B4" id="IUCel" type="text" autoComplete="off" />
                            <p>Constraseña</p>
                            <input className="B4" id="ICCel" type="password" autoComplete="off" />
                        </div>
                        <div className="GridCom2Div1_">
                            <button className="B4" onClick={this.IniciarSCel}>Aceptar</button>
                            <button className="B4">Iniciar sesión con Google</button>
                        </div>
                    </div>
                </div>
                {/*Registro de usuarios en celular*/}
                <div id="RegistroCel">
                    <div id="RegistroCel2">
                        <div id="XimageC">
                            <img id="Ximage" onClick={this.Close} src="https://images.vexels.com/media/users/3/155473/isolated/preview/faa3172dd52035d0c227d7ecab4d6024-doodle-cruzado-x-by-vexels.png" />
                        </div>
                        <div className="GridCom2Div1">
                            <h2 id="TitleReg">Registro</h2>
                        </div>
                        <div className="GridCom2Div1">
                            <input className="B1" id="NRCe" type="text" placeholder="Nombre" autoComplete="off" />
                            <input className="B1" id="ARCe" type="text" placeholder="Apellido" autoComplete="off" />
                        </div>
                        <div className="GridCom2Div1">
                            <input className="B1" id="DRCe" type="text" onChange={this.UserName2} placeholder="Username" autoComplete="off" />
                            <input className="B1" id="CRCe" type="email" placeholder="Correo" autoComplete="off" />
                        </div>
                        <div className="GridCom2Div1">
                            <select className="B2" id="SRCe">

                                <option className="None" value="none">Sexo</option>
                                <option value="Hombre">Hombre</option>
                                <option value="Mujer">Mujer</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <input className="B3" id="ERCe" type="date" min={FechaMin} max={FechaH} placeholder="Edad" autoComplete="off" />
                        </div>
                        <div className="GridCom2Div1">
                            <input className="B1" id="CoRCe" type="password" placeholder="Contraseña" autoComplete="of" />
                            <input className="B1" id="Co2RCe" type="password" placeholder="Confirmar Contraseña" autoComplete="of" />
                        </div>
                        <div className="GridCom2Div1_">
                            <button className="B4" onClick={this.RegistrarUsuCel}>Aceptar</button>
                            <button className="B4">Registrarse con Google</button>
                        </div>
                    </div>
                </div>

                <div id="Main1Container">
                    <div id="GridComp1">
                        <p id="PInfo">Learn With Us es un programa para alumnos, que desarrolla su aprendizaje mediante contenidos interactivos y herramientas diversas, facilitándole a los maestros la búsqueda de estas estrategias y métodos de enseñanza en la virtualidad, nuestro producto no genera presión en el alumno y recurre a diferentes dinámicas.
</p>
                    </div>
                    <div className="GridCom2Div1__">
                        <button className="button B1" onClick={this.IniciarCel}>Iniciar sesión</button>
                        <button className="button B1" onClick={this.RegistrarCel}>Registrarse</button>
                    </div>

                    {/*Computador*/}
                    <div id="GridComp2">
                        <div className="GridCom2Div1">
                            <button className="button B1" onClick={this.IniciarCom}>Iniciar sesión</button>
                            <button className="button B1" onClick={this.RegistrarCom}>Registrarse</button>
                        </div>
                        {/*Logo Inicial...................*/}
                        <div id="LogoInicialC">
                            <img id="LogoInicial" src="https://1.bp.blogspot.com/-4AYfdW1HnGQ/X02wnk_2J_I/AAAAAAAAPPk/znnHlLxw_bINf8jIvcaE3hxEruVJOjcawCLcBGAsYHQ/s16000/Logo.png" />
                        </div>
                        {/*Registro de usuarios Computador*/}
                        <div id="GridCom2Div2">
                            <div className="GridCom2Div1T">
                                <h2 id="TitleReg">Registro</h2>
                                <p id="PAlert"></p>
                            </div>
                            <div className="GridCom2Div1">
                                <input className="B1" id="NRC" type="text" placeholder="Nombre" autoComplete="off" />
                                <input className="B1" id="ARC" type="text" placeholder="Apellido" autoComplete="off" />
                            </div>
                            <div className="GridCom2Div1">
                                <input className="B1" id="DRC" type="text" onChange={this.UserName} placeholder="Username" autoComplete="off" />
                                <input className="B1" id="CRC" placeholder="Correo" type="email" autoComplete="off" />
                            </div>
                            <div className="GridCom2Div1">
                                <select className="B2" id="SRC">
                                    <option className="None" value="none">Sexo</option>
                                    <option value="Hombre">Hombre</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <input className="B3" id="ERC" type="date" min={FechaMin} max={FechaH} placeholder="Edad" autoComplete="off" />
                            </div>
                            <div className="GridCom2Div1">
                                <input className="B1" id="CoRC" type="password" placeholder="Contraseña" autoComplete="off" />
                                <input className="B1" id="Co2RC" type="password" placeholder="Confirmar Contraseña" autoComplete="off" />
                            </div>
                            <div className="GridCom2Div1_">
                                <button className="B4" onClick={this.RegistrarUsuCom}>Aceptar</button>
                                <button className="B4">Registrarse con Google </button>
                            </div>
                        </div>
                        {/*Inicio de sesión Computador*/}
                        <div id="GridCom2Div3">
                            <div className="GridCom2Div1">
                                <h2 id="TitleReg">Iniciar Sesión</h2>
                            </div>
                            <div id="GridCom2Div3_">
                                <p>Usuario</p>
                                <input className="B4" id="IUC" autoComplete="off" type="text" />
                                <p>Constraseña</p>
                                <input className="B4" id="ICC" autoComplete="off" type="password" />
                            </div>
                            <div className="GridCom2Div1_">
                                <button className="B4" onClick={this.IniciarSCom}>Aceptar</button>
                                <button className="B4">Iniciar sesión con Google</button>
                            </div>
                        </div>
                    </div>

                </div>
                {this.state.Bool && <Redirect to="/Principal"></Redirect>}
            </>
        );
    }
}

export default Main1;