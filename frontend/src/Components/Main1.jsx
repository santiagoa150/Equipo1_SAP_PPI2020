import React from 'react';

import { Usuarios } from '../Utiles/Mocks/Usuarios';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import axios from 'axios';
import '../Styles/Main1.css';
import { Redirect, Link } from 'react-router-dom';

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
            ConB2: false,
            data: []
        }
    }

    getInicioSesionCom = () =>{
        let User = document.getElementById("IUC");
        axios.get(`http://localhost:3883/Usu/usuario-sesion/${User.value}`)
            .then(res =>{                
                this.setState({data: res.data});
                console.log(this.state.data);
            }).catch(err =>{
                console.log(err.massage);
            })
    }
    getInicioSesionCel = () =>{
        let User = document.getElementById("IUCel");
        axios.get(`http://localhost:3883/Usu/usuario-sesion/${User.value}`)
        .then(res =>{
            this.setState({data: res.data.results});
        }).catch(err =>{
            console.log(err.massage);
        })
    }
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
    RegistrarUsuCom = () => {
        let Nombre = document.getElementById("NRC"), Apellido = document.getElementById("ARC");
        let UserName = document.getElementById("DRC"), Correo = document.getElementById("CRC");
        let Sexo = document.getElementById("SRC"), Edad = document.getElementById("ERC");
        let Contraseña = document.getElementById("CoRC"), Contraseña2 = document.getElementById("Co2RC");
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
            if (this.state.UserB == false) {
                UserName.style.color = "red";
                UserName.value = "Usuario invalido";
                this.Time(UserName, "text");
            }
            if (Contraseña.value == Contraseña2.value) {
                if (this.state.UserB == true) {
                    Usuarios.push({
                        Nombre: Nombre.value,
                        Apellido: Apellido.value,
                        UserName: UserName.value,
                        Correo: Correo.value,
                        Edad: años,
                        FechaN: new Date(edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1)),
                        Sexo: Sexo.value,
                        Contraseña: Contraseña.value,
                        id: Usuarios.length,
                        image: "https://1.bp.blogspot.com/-p-TNqGEoS5w/X1PrFJ6rBYI/AAAAAAAAPQU/cgfqUztLg1YJL0zxyfRp8sEkhWGsymFUwCLcBGAsYHQ/s16000/Perf%25C3%25ADlLogo.png"
                    });
                    Nombre.value = "";
                    Apellido.value = "";
                    UserName.value = "";
                    Correo.value = "";
                    Edad.value = "";
                    Contraseña.value = "";
                    Contraseña2.value = "";
                    this.IniciarCom();
                }
            }
        } else {
            if (Nombre.value == "") {
                Nombre.style.color = "red";
                Nombre.value = "Dato no ingresado.";
                this.Time(Nombre, "text");
            } if (Apellido.value == "") {
                Apellido.style.color = "red";
                Apellido.value = "Dato no ingresado.";
                this.Time(Apellido, "text");
            } if (UserName.value == "") {
                UserName.style.color = "red";
                UserName.value = "Dato no ingresado."
                this.Time(UserName, "text");
            } if (Correo.value == "") {
                Correo.style.color = "red";
                Correo.value = "Dato no ingresado.";
                this.Time(Correo, "email")
            } if (Edad.value == "") {
                Edad.type = "text";
                Edad.style.color = "red";
                Edad.value = "Dato no ingresado.";
                this.Time(Edad, "date");
            } if (Contraseña.value == "") {
                Contraseña.type = "text";
                Contraseña.style.color = "red";
                Contraseña.value = "Dato no ingresado.";
                this.Time(Contraseña, "password")
            } if (Contraseña2.value == "") {
                Contraseña2.type = "text";
                Contraseña2.style.color = "red";
                Contraseña2.value = "Dato no ingresado.";
                this.Time(Contraseña2, "password");
            }
        }

    }
    RegistrarUsuCel = () => {
        let Nombre = document.getElementById("NRCe");
        let Apellido = document.getElementById("ARCe");
        let UserName = document.getElementById("DRCe");
        let Correo = document.getElementById("CRCe");
        let Sexo = document.getElementById("SRCe"), Edad = document.getElementById("ERCe");
        let Contraseña = document.getElementById("CoRCe"), Contraseña2 = document.getElementById("Co2RCe");
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
            if (this.state.UserB == false) {
                UserName.style.color = "red";
                UserName.value = "Usuario invalido";
                this.Time(UserName, "text");
            }
            if (Contraseña.value == Contraseña2.value) {
                if (this.state.UserB == true) {
                    Usuarios.push({
                        Nombre: Nombre.value,
                        Apellido: Apellido.value,
                        UserName: UserName.value,
                        Correo: Correo.value,
                        Edad: años,
                        FechaN: new Date(edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1)),
                        Sexo: Sexo.value,
                        Contraseña: Contraseña.value,
                        id: Usuarios.length,
                        image: "https://1.bp.blogspot.com/-p-TNqGEoS5w/X1PrFJ6rBYI/AAAAAAAAPQU/cgfqUztLg1YJL0zxyfRp8sEkhWGsymFUwCLcBGAsYHQ/s16000/Perf%25C3%25ADlLogo.png"
                    });
                    Nombre.value = "";
                    Apellido.value = "";
                    UserName.value = "";
                    Correo.value = "";
                    Edad.value = "";
                    Contraseña.value = "";
                    Contraseña2.value = "";
                    this.IniciarCel();
                }
            }
        } else {
            if (Nombre.value == "") {
                Nombre.style.color = "red";
                Nombre.value = "Dato no ingresado.";
                this.Time(Nombre, "text");
            } if (Apellido.value == "") {
                Apellido.style.color = "red";
                Apellido.value = "Dato no ingresado.";
                this.Time(Apellido, "text");
            } if (UserName.value == "") {
                UserName.style.color = "red";
                UserName.value = "Dato no ingresado."
                this.Time(UserName, "text");
            } if (Correo.value == "") {
                Correo.style.color = "red";
                Correo.value = "Dato no ingresado.";
                this.Time(Correo, "email")
            } if (Edad.value == "") {
                Edad.type = "text";
                Edad.style.color = "red";
                Edad.value = "Dato no ingresado.";
                this.Time(Edad, "date");
            } if (Contraseña.value == "") {
                Contraseña.type = "text";
                Contraseña.style.color = "red";
                Contraseña.value = "Dato no ingresado.";
                this.Time(Contraseña, "password")
            } if (Contraseña2.value == "") {
                Contraseña2.type = "text";
                Contraseña2.style.color = "red";
                Contraseña2.value = "Dato no ingresado.";
                this.Time(Contraseña2, "password");
            }
        }

    }
    Time = (Propi, Propi2) => {
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.value = "";
        }, 1500)
    }
    UserName = () => {
        let user = document.getElementById("DRC");
        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].UserName != user.value) {
                this.setState({ UserB: true });
                user.style.color = "black";
            } else {
                this.setState({ UserB: false });
                user.style.color = "red";
            }
        }
    }
    UserName2 = () => {
        let user = document.getElementById("DRCe");
        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].UserName != user.value) {
                this.setState({ UserB: true });
                user.style.color = "black";
            } else {
                this.setState({ UserB: false });
                user.style.color = "red";
            }
        }
    }
    IniciarSCom = () => {
        let Usuario = document.getElementById("IUC");
        let Contraseña = document.getElementById("ICC");
        this.getInicioSesionCom();
        if (Usuario.value != "" && Contraseña.value != "") {
            if(this.state.data.length==0){
                Usuario.style.color = "red";
                Usuario.value = "El usuario no existe";
                this.Time(Usuario, "text");
            }else {

            }           
        } else {
            if (Usuario.value == "") {
                Usuario.style.color = "red";
                Usuario.value = "Dato no ingresado.";
                this.Time(Usuario, "text");
            } if (Contraseña.value == "") {
                Contraseña.type="text";
                Contraseña.style.color = "red";
                Contraseña.value = "Dato no ingresado.";
                this.Time(Contraseña, "password");
            }
        }
    }
    IniciarSCel = () => {
        let Usuario = document.getElementById("IUCel");
        let Contraseña = document.getElementById("ICCel");
        this.getInicioSesionCel();
        if (Usuario.value != "" && Contraseña.value != "") {
            for (let i = 0; i < Usuarios.length; i++) {
                if (Usuarios[i].UserName == Usuario.value && Usuarios[i].Contraseña == Contraseña.value) {
                    UsuarioI.push({
                        Nombre: Usuarios[i].Nombre,
                        Apellido: Usuarios[i].Apellido,
                        UserName: Usuarios[i].UserName,
                        Correo: Usuarios[i].Correo,
                        Edad: Usuarios[i].Edad,
                        FechaN: Usuarios[i].FechaN,
                        Sexo: Usuarios[i].Sexo,
                        Contraseña: Usuarios[i].Contraseña,
                        id: Usuarios[i].id,
                        image: Usuarios[i].image
                    });

                    this.setState({ Bool: true });
                }
            }
        } else {
            if (Usuario.value == "") {
                Usuario.style.color = "red";
                Usuario.value = "Dato no ingresado.";
                this.Time(Usuario, "text");
            } if (Contraseña.value == "") {
                Contraseña.style.color = "red";
                Contraseña.value = "Dato no ingresado.";
                this.Time(Contraseña, "password");
            }
        }
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
                                <option className="None" value="0">Sexo</option>
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
                                    <option className="None" value="None">Sexo</option>
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