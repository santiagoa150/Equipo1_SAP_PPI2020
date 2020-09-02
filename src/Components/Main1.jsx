import React from 'react';

import { Usuarios } from '../Utiles/Mocks/Usuarios';

import '../Styles/Main1.css';
import { Redirect } from 'react-router-dom';

let Dat = new Date();
let Daño = Dat.getFullYear();
let DatFin = Dat.getFullYear() + "-" + (Dat.getMonth().toString()).padStart(2, 0) + "-" + (Dat.getDate().toString()).padStart(2, 0);

class Main1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Bool: false
        }
    }

    InicioCel = () => {
        document.getElementById("FormTeleInicio").style.display = "flex";
        document.getElementById("FormTeleRegistro").style.display = "none";
    }
    RegistroCel = () => {
        document.getElementById("FormTeleRegistro").style.display = "flex";
        document.getElementById("FormTeleInicio").style.display = "none";
    }

    InicioCom = () => {
        document.getElementById("ImagePreform").style.display = "none";
        document.getElementById("MainInicioCom").style.display = "flex";
        document.getElementById("MainRegistroCom").style.display = "none";
        document.getElementById("Grid1Main1").style.width = "70%";
        document.getElementById("Grid1Main1").style.marginLeft = "30%";
    }
    RegistroCom = () => {
        document.getElementById("ImagePreform").style.display = "none";
        document.getElementById("MainInicioCom").style.display = "none";
        document.getElementById("MainRegistroCom").style.display = "flex";
        document.getElementById("Grid1Main1").style.width = "60%";
        document.getElementById("Grid1Main1").style.marginLeft = "20%";
    }
    Registro = () => {
        let WidthBody = document.body.clientWidth;
        if (WidthBody > 720) {

            let Usuario = document.getElementById("UsuRegCom").value;
            let Contraseña = document.getElementById("ConRegCom").value;
            let Contraseña2 = document.getElementById("CofRegCom").value;
            let Correo = document.getElementById("CorRegCom").value;
            let Nombres = document.getElementById("NomRegCom").value;
            let Apellidos = document.getElementById("ApeRegCom").value;
            let Edad = document.getElementById("EdaRegCom").value;
            let Edadsub = parseInt(Edad.substr(0, 4));
            let Edad2 = Daño - Edadsub;
            let Notificaciones = document.getElementById("CheRegCom").value;
            let Sexo = document.getElementById("SexRegCom").value;

            if (Sexo == 0) {
                Sexo = "Sin definir";
            }

            if (Usuario != "" && Contraseña != "" && Correo != "" && Nombres != "" && Apellidos != "" && Edad != "" && Contraseña2 != "") {
                if (Contraseña2 == Contraseña) {
                    Usuarios.push({
                        Usuario: Usuario,
                        Contraseña: Contraseña,
                        Correo: Correo,
                        Nombres: Nombres,
                        Apellidos: Apellidos,
                        Edad: Edad2,
                        FechaN: Edad,
                        Notificaciones: Notificaciones,
                        Sexo: Sexo
                    });
                    this.InicioCom();
                } else {
                    document.getElementById("ConRegCom").style.color = "red";
                    document.getElementById("CofRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("ConRegCom").value = "";
                        document.getElementById("ConRegCom").style.color = "black";
                        document.getElementById("CofRegCom").value = "";
                        document.getElementById("CofRegCom").style.color = "black";
                    }, 1000);
                }

            } else {
                if (Usuario == "") {
                    document.getElementById("UsuRegCom").value = "Dato sin ingresar.";
                    document.getElementById("UsuRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("UsuRegCom").value = "";
                        document.getElementById("UsuRegCom").style.color = "black";
                    }, 1000);
                } if (Contraseña == "") {
                    document.getElementById("ConRegCom").value = "Dato sin ingresar.";
                    document.getElementById("ConRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("ConRegCom").value = "";
                        document.getElementById("ConRegCom").style.color = "black";
                    }, 1000);
                } if (Contraseña2 == "") {
                    document.getElementById("CofRegCel").value = "Dato sin ingresar.";
                    document.getElementById("CofRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("CofRegCel").value = "";
                        document.getElementById("CofRegCel").style.color = "black";
                    }, 1000);
                } if (Correo == "") {
                    document.getElementById("CorRegCom").value = "Dato sin ingresar.";
                    document.getElementById("CorRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("CorRegCom").value = "";
                        document.getElementById("CorRegCom").style.color = "black";
                    }, 1000);
                } if (Nombres == "") {
                    document.getElementById("NomRegCom").value = "Dato sin ingresar.";
                    document.getElementById("NomRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("NomRegCom").value = "";
                        document.getElementById("NomRegCom").style.color = "black";
                    }, 1000);
                } if (Apellidos == "") {
                    document.getElementById("ApeRegCom").value = "Dato sin ingresar.";
                    document.getElementById("ApeRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("ApeRegCom").value = "";
                        document.getElementById("ApeRegCom").style.color = "black";
                    }, 1000);
                } if (Edad == "") {
                    document.getElementById("EdaRegCom").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("EdaRegCom").value = "";
                        document.getElementById("EdaRegCom").style.color = "black";
                    }, 1000);
                }
            }

        } else {
            let Usuario = document.getElementById("UsuRegCel").value;
            let Contraseña = document.getElementById("ConRegCel").value;
            let Contraseña2 = document.getElementById("CofRegCel").value;
            let Correo = document.getElementById("CorRegCel").value;
            let Nombres = document.getElementById("NomRegCel").value;
            let Apellidos = document.getElementById("ApeRegCel").value;
            let Edad = document.getElementById("EdaRegCel").value;
            let Edadsub = parseInt(Edad.substr(0, 4));
            let Edad2 = Daño - Edadsub;
            let Notificaciones = document.getElementById("CheRegCel").value;
            let Sexo = document.getElementById("SexRegCel").value;
            if (Sexo == 0) {
                Sexo = "Sin definir";
            }

            if (Usuario != "" && Contraseña != "" && Correo != "" && Nombres != "" && Apellidos != "" && Edad != "" && Contraseña2 != "") {
                if (Contraseña2 == Contraseña) {
                    Usuarios.push({
                        Usuario: Usuario,
                        Contraseña: Contraseña,
                        Correo: Correo,
                        Nombres: Nombres,
                        Apellidos: Apellidos,
                        Edad: Edad2,
                        FechaN: Edad,
                        Notificaciones: Notificaciones,
                        Sexo: Sexo
                    });
                    this.InicioCel();
                } else {
                    document.getElementById("ConRegCel").style.color = "red";
                    document.getElementById("CofRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("ConRegCel").value = "";
                        document.getElementById("ConRegCel").style.color = "black";
                        document.getElementById("CofRegCel").value = "";
                        document.getElementById("CofRegCel").style.color = "black";
                    }, 1000);
                }

            } else {
                if (Usuario == "") {
                    document.getElementById("UsuRegCel").value = "Dato sin ingresar.";
                    document.getElementById("UsuRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("UsuRegCel").value = "";
                        document.getElementById("UsuRegCel").style.color = "black";
                    }, 1000);
                } if (Contraseña == "") {
                    document.getElementById("ConRegCel").value = "Dato sin ingresar.";
                    document.getElementById("ConRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("ConRegCel").value = "";
                        document.getElementById("ConRegCel").style.color = "black";
                    }, 1000);
                } if (Contraseña2 == "") {
                    document.getElementById("CofRegCel").value = "Dato sin ingresar.";
                    document.getElementById("CofRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("CofRegCel").value = "";
                        document.getElementById("CofRegCel").style.color = "black";
                    }, 1000);
                }
                if (Correo == "") {
                    document.getElementById("CorRegCel").value = "Dato sin ingresar.";
                    document.getElementById("CorRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("CorRegCel").value = "";
                        document.getElementById("CorRegCel").style.color = "black";
                    }, 1000);
                } if (Nombres == "") {
                    document.getElementById("NomRegCel").value = "Dato sin ingresar.";
                    document.getElementById("NomRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("NomRegCel").value = "";
                        document.getElementById("NomRegCel").style.color = "black";
                    }, 1000);
                } if (Apellidos == "") {
                    document.getElementById("ApeRegCel").value = "Dato sin ingresar.";
                    document.getElementById("ApeRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("ApeRegCel").value = "";
                        document.getElementById("ApeRegCel").style.color = "black";
                    }, 1000);
                } if (Edad == "") {
                    document.getElementById("EdaRegCel").style.color = "red";
                    setTimeout(function () {
                        document.getElementById("EdaRegCel").value = "";
                        document.getElementById("EdaRegCel").style.color = "black";
                    }, 1000);
                }
            }
        }
    }

    Usua = () => {
        let Usucel = document.getElementById("UsuRegCom").value;
        let Usucom = document.getElementById("UsuRegCel").value;

        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].Usuario == Usucel || Usuarios[i].Usuario == Usucom) {
                document.getElementById("PContraCel").style.display = "block";
                document.getElementById("PContraCom").style.display = "block";
            } else {
                document.getElementById("PContraCel").style.display = "none";
                document.getElementById("PContraCom").style.display = "none";
                document.getElementById("PContraCel").style.display = document.getElementById("PContraCel").value;
                document.getElementById("PContraCom").style.display = document.getElementById("PContraCom").value;
            }
        }
    }

    PrincipalCom = () =>{
        let CorreUsu = document.getElementById("InicioUsuCom").value;
        let Contra = document.getElementById("InicioConCom").value;

        for(let i= 0; i<Usuarios.length; i++){
            if(Usuarios[i].Contraseña == Contra && Usuarios[i].Usuario == CorreUsu){
                this.setState({
                    Bool: true
                })
            } else if(Usuarios[i].Contraseña == Contra && Usuarios[i].Correo == CorreUsu){
                this.setState({
                    Bool: true
                })
            }else{
                document.getElementById("InicioUsuCom").style.color = "red";
                setTimeout(function(){
                    document.getElementById("InicioUsuCom").style.color = "black";
                    document.getElementById("InicioUsuCom").value = "";
                }, 1000);
                document.getElementById("InicioConCom").style.color = "red";
                setTimeout(function(){
                    document.getElementById("InicioConCom").style.color = "black";
                    document.getElementById("InicioConCom").value = "";
                }, 1000);
            }
        }
    }

    PrincipalCel = () =>{
        let CorreUsu = document.getElementById("InicioUsuCel").value;
        let Contra = document.getElementById("InicioConCel").value;

        for(let i= 0; i < Usuarios.length; i++){
            if(Usuarios[i].Contraseña == Contra && Usuarios[i].Usuario == CorreUsu){
                this.setState({
                    Bool: true
                });
            } else if(Usuarios[i].Contraseña == Contra && Usuarios[i].Correo == CorreUsu){
                this.setState({
                    Bool: true
                });
            }else{
                document.getElementById("InicioUsuCel").style.color = "red";
                setTimeout(function(){
                    document.getElementById("InicioUsuCel").style.color = "black";
                    document.getElementById("InicioUsuCel").value = "";
                }, 1000);
                document.getElementById("InicioConCel").style.color = "red";
                setTimeout(function(){
                    document.getElementById("InicioConCel").style.color = "black";
                    document.getElementById("InicioConCel").value = "";
                }, 1000);
            }
        }
    }

    render() {
        return (
            <>
                <div id="Main1Container">
                    <div id="FormTeleInicio">
                        <div id="MainInicioCel">
                            <div id="TitleInicioCel">
                                <h2>Iniciar sesión</h2>
                            </div>
                            <div className="GrupoForm">
                                <p className="BotP">Correo/Usuario</p>
                                <input className="BIniCel TopIn" id="InicioUsuCel" type="email" placeholder="Correo/Usuario" autoComplete="off" />
                            </div>
                            <div className="GrupoForm">
                                <p className="BotP">Contraseña</p>
                                <input placeholder="Contraseña TopIn"  id="InicioConCel" className="BIniCel" autoComplete="off" />
                            </div>

                            <button className="BIniCel button">Iniciar sesión con google</button>
                            <button className="BIniCel button" onClick={this.PrincipalCel}>Aceptar</button>
                        </div>
                    </div>


                    <div id="FormTeleRegistro">
                        <div id="MainRegistroCel">
                            <div id="TitleRegistroCel">
                                <h2>Registrarse</h2>
                            </div>
                            <div id="RegistroMain1">
                                <div>
                                    <input className="BIniCel2" id="NomRegCel" placeholder="Nombres" autoComplete="off" />
                                    <input className="BIniCel2" id="ApeRegCel" placeholder="Apellidos" autoComplete="off" />
                                    <input className="BIniCel2" id="EdaRegCel" type="date" max={DatFin} autoComplete="off" />
                                    <select className="BIniCel2" id="SexRegCel">
                                        <option value="0" className="DisCel">Sexo</option>
                                        <option value="M" >Hombre</option>
                                        <option value="F" >Mujer</option>
                                        <option value="O">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <p id="PContraCel">Usuario registrado</p>
                                    <input className="BIniCel2" id="UsuRegCel" onChange={this.Usua} placeholder="Usuario" autoComplete="off" />
                                    <input className="BIniCel2" id="CorRegCel" type="email" placeholder="Correo" autoComplete="off" />
                                    <input className="BIniCel2" id="ConRegCel" type="password" placeholder="Contraseña" autoComplete="off" />
                                    <input className="BIniCel2" id="CofRegCel" type="password" placeholder="Confirmar Contraseña" autoComplete="off" />
                                </div>
                            </div>
                            <div id="RegistroMain2">
                                <p >¿Desea recibir notificaciones personalizadas en su correo?</p>
                                <input className="BIniCel" id="CheRegCel" type="checkbox" />
                            </div>
                            <button className="BIniCel3 button">Registrase con google</button>
                            <button className="BIniCel3 button" onClick={this.Registro}>Aceptar</button>
                        </div>
                    </div>



                    <div id="Grid1Main1">
                        <div id="SubGrid1_1">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, et delectus earum aspernatur sunt esse sapiente laborum sequi sint nobis voluptate, sed consectetur veritatis, itaque ipsa ex officia dolore tenetur!</p>
                        </div>
                        <div id="SubGrid2_1">
                            <button className="DisCom ButtonIni" onClick={this.InicioCel}>Iniciar sesión</button>
                            <button className="DisCom ButtonIni" onClick={this.RegistroCel}>Registrarse</button>
                        </div>
                    </div>
                    <div id="Grid2Main1" className="DisCel">
                        <div id="SubGrid1_2">
                            <button className="ButtonIni" onClick={this.InicioCom}>Iniciar sesión</button>
                            <button className="ButtonIni" onClick={this.RegistroCom}>Registrarse</button>
                        </div>
                        <div id="SubGrid1_1">
                            <img id="ImagePreform" src="https://1.bp.blogspot.com/-4AYfdW1HnGQ/X02wnk_2J_I/AAAAAAAAPPk/znnHlLxw_bINf8jIvcaE3hxEruVJOjcawCLcBGAsYHQ/s16000/Logo.png" />

                            <div id="MainInicioCom" className="DisInicioCom">
                                <div id="TitleInicioCom">
                                    <h2>Iniciar sesión</h2>
                                </div>
                                <div className="GrupoForm">
                                    <p className="BotP">Correo/Usuario</p>
                                    <input className="buttonComI TopIn" id="InicioUsuCom" placeholder="Correo/Usuario" type="email" autoComplete="off" />
                                </div>
                                <div className="GrupoForm">
                                    <p className="BotP">Contraseña</p>
                                    <input placeholder="Contraseña TopIn" id="InicioConCom" className="buttonComI" autoComplete="off" />
                                </div>
                                <div id="Main2InicioCom">
                                    <button className="buttonComI2 button">Iniciar sesión con google</button>
                                    <button className="buttonComI2 button" onClick={this.PrincipalCom}>Aceptar</button>
                                </div>
                            </div>

                            <div id="MainRegistroCom" className="DisInicioCom">
                                <div id="TitleRegistroCel">
                                    <h2>Registrarse</h2>
                                </div>
                                <div id="RegistroMain1">
                                    <div>
                                        <input className="BIniCel2" id="NomRegCom" placeholder="Nombres" autoComplete="off" />
                                        <input className="BIniCel2" id="ApeRegCom" placeholder="Apellidos" autoComplete="off" />
                                        <input className="BIniCel2" id="EdaRegCom" type="date" max={DatFin} autoComplete="off" />
                                        <select className="BIniCel2" id="SexRegCom">
                                            <option value="0" className="DisCom">Sexo</option>
                                            <option value="M" >Hombre</option>
                                            <option value="F" >Mujer</option>
                                            <option value="O">Otro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p id="PContraCom">Usuario Registrado</p>
                                        <input className="BIniCel2" id="UsuRegCom" onChange={this.Usua} placeholder="Usuario" autoComplete="off" />
                                        <input className="BIniCel2" id="CorRegCom" type="email" placeholder="Correo" autoComplete="off" />
                                        <input className="BIniCel2" id="ConRegCom" type="password" placeholder="Contraseña" autoComplete="off" />
                                        <input className="BIniCel2" id="CofRegCom" type="password" placeholder="Confirmar contraseña" autoComplete="off" />
                                    </div>
                                </div>
                                <div id="RegistroMain2">
                                    <p id="PMainReg2">¿Desea recibir notificaciones personalizadas en su correo?</p>
                                    <input id="PMainReg1" id="CheRegCom" className="BIniCel" type="checkbox" />
                                </div>
                                <button className="BIniCel3 button">Registrase con google</button>
                                <button className="BIniCel3 button" onClick={this.Registro}>Aceptar</button>
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.Bool && <Redirect to="/Principal"></Redirect>
                }
            </>
        );
    }
}

export default Main1;