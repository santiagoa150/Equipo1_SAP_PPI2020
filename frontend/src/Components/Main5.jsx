import React from 'react';
import '../Styles/Main5.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Clases } from '../Utiles/Mocks/Clases';
import { User_clase } from '../Utiles/Mocks/User_clase';
import { Usuarios } from '../Utiles/Mocks/Usuarios';
import axios from 'axios';
let bool = true, bool2 = true, SubirUsu = new Array(), i = 0;
class Main5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataClase: [],
            DataClaseI: [],
            Modal1: false
        }
    }
    async componentDidMount() {
        await this.getClasesC();
        await this.getClasesI();
        /*CLASES CREADAS*/
        if (this.state.DataClase.length == 0) {
            document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("clasesP2").style.justifyContent = "center";
        }

        if (this.state.DataClaseI.length == 0) {
            document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>"
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("contidU2").style.justifyContent = "center";
        }
    }
    /*METODOS SIMPLES*/
    /*Permite ocultar y/o mostrar las clases creadas*/
    Accion1 = () => {
        if (!bool) {
            document.getElementById("clasesP2").style.display = "block";
            document.getElementById("ClasesC").value = "Clases creadas ▼";
            if (this.state.DataClase.length == 0) {
                document.getElementById("clasesP2").style.display = "flex";
                document.getElementById("clasesP2").style.justifyContent = "center";
                document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            }
            bool = true
        } else {
            document.getElementById("ClasesC").value = "Clases creadas ►"
            document.getElementById("clasesP2").style.display = "none";
            bool = false
        }
    }
    /*Permite ocultar y/o mostrar las clases inscritas*/
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("contidU2").style.display = "block";
            document.getElementById("ClasesP").value = "Clases inscritas ▼";
            if (this.state.DataClaseI.length == 0) {
                document.getElementById("contidU2").style.display = "flex";
                document.getElementById("contidU2").style.justifyContent = "center";
                document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>";
            }
            bool2 = true
        } else {
            document.getElementById("ClasesP").value = "Clases inscritas ►"
            document.getElementById("contidU2").style.display = "none";
            bool2 = false
        }
    }
    /*Este metodo hace el switch del modal en celular*/
    Switch = () => {
        let titl1 = document.getElementById("DisPrimero");
        if (titl1.style.display == "none" || titl1.style.display == "") {
            document.getElementById("DisSegundo").style.display = "none";
            titl1.style.display = "block";
            document.getElementById("PopUp1Apar").style.display = "block";
            document.getElementById("PopUp2Apar").style.display = "none";
        } else {
            document.getElementById("DisSegundo").style.display = "block";
            titl1.style.display = "none";
            document.getElementById("PopUp1Apar").style.display = "none";
            document.getElementById("PopUp2Apar").style.display = "grid";
        }
    }
    /*MODAL1*/
    /*Metodo que determina si el modal 1 se pinta o no*/
    Modal1 = () => {
        this.setState({
            Modal1: !this.state.Modal1
        })
    }
    /*Metodo que retorna el modal 1*/
    Modal1Return = () => {
        if (this.state.Modal1) {
            return (
                <div className="Modal1ClasesR">
                    <div className="DisCom BotonesMoverCel">
                        <button className="BotonFlechita" onClick={() => this.Switch()}>◄</button>
                        <p id="DisSegundo">Crear clase</p>
                        <p id="DisPrimero">Unirse a una clase</p>
                        <button className="BotonFlechita" onClick={() => this.Switch()}>►</button>
                    </div>
                    <div className="PopUp2_ AparCom2" id="PopUp1Apar">
                        <div className="titleModal1Class DisCel">
                            <h2 className="titleModal1ClasH2">Unirse a una clase</h2>
                        </div>
                        <div className="ContainerPopUp2">
                            <div className="infoContainerModalClass">
                                <div className="infoContainerModalClass2">
                                    <p>Si quieres unirte a una clase debes ingresar la id de la clase y esperar que el creador acepte la petición de unirte o pedirle al creador que te una y debes aceptar la invitación a unirse.</p>
                                </div>
                            </div>
                            <div className="Group GroupC3">
                                <div>
                                    <div>
                                        <p className="Group">Id clase</p>
                                        <input type="text" className="inputCrearClase Group" id="UsuarioClase2" autoComplete="off" />
                                    </div>
                                </div>
                                <input type="button" className="inputCrearClase2" onClick={this.SubirUsuario2} />
                            </div>
                            <button className="BotonMadreClase bmargintop" onClick={this.Modal1}>Cancelar</button>
                        </div>
                    </div>
                    <div className="PopUp1_ AparCom" id="PopUp2Apar">
                        <div className="titleModal1Class titleModal1Class2 DisCel">
                            <h2 className="titleModal1ClasH2">Crear clase</h2>
                        </div>
                        <div id="PopUpPart1">
                            <div className="GroupC">
                                <p className="Group">Nombre</p>
                                <input type="text" id="NombreClase" className="Group inputCrearClase" autoComplete="off" />
                            </div>
                            <div className="GroupC">
                                <p className="Group">Usuario</p>
                                <div className="Group GroupC2">
                                    <input type="text" className="inputCrearClase" id="UsuarioClase" autoComplete="off" />
                                    <input type="button" className="inputCrearClase2_" onClick={this.SubirUsuario1} />
                                </div>
                            </div>
                        </div>
                        <div id="PopUpPart2">
                            <div id="UsuariosIN">
                            </div>
                        </div>
                        <div id="XimageCrearClase">
                            <button onClick={this.Modal1} className="BotonMadreClase">Cancelar</button>
                            <button onClick={this.CrearClase2} className="BotonMadreClase">Aceptar</button>
                        </div>
                    </div>
                </div>
            );
        }

    }
    CrearClase2 = () => {
        let Nombre = document.getElementById("NombreClase");
        let fecha = new Date();
        if (Nombre.value == "") {
            Nombre.style.color = "red";
            Nombre.value = "Valor no ingresado";
            setTimeout(function () {
                Nombre.value = "";
                Nombre.style.color = "black";
            }, 1000);
        } else {
            let leng = Clases.length;
            Clases.push({
                id: leng,
                idusuario: UsuarioI[0].id,
                fechaC: new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 1)),
                titulo: Nombre.value
            });
            for (let i = 0; i < SubirUsu.length; i++) {
                User_clase.push({
                    id: User_clase.length,
                    idusuario: SubirUsu[i],
                    idclase: leng,
                    fechaU: new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 1))
                });
            }
            this.setState({
                Clase: Clases.filter(Esito => UsuarioI[0].id == Esito.idusuario),
                Usuario_C: User_clase.filter(Esito => UsuarioI[0].id == Esito.idusuario),
            });
            document.getElementById("UsuariosIN").innerHTML = "";
            document.getElementById("NombreClase").value = "";
            document.getElementById("PopUp1").style.display = "none";
            if (document.getElementById("clasesP2").innerHTML == "<p>No hay clases creadas.</p>") {
                document.getElementById("clasesP2").innerHTML = "";
            }
        }
        return this;
    }
    SubirUsuario1 = () => {
        if (document.getElementById("UsuarioClase").value == "") {
            document.getElementById("UsuarioClase").style.color = "red"
            document.getElementById("UsuarioClase").value = "No ingresado"
            setTimeout(function () {
                document.getElementById("UsuarioClase").value = "";
                document.getElementById("UsuarioClase").style.color = "black";
            }, 1000);
        } else {
            let j = document.getElementById("UsuarioClase").value;
            let inner = document.getElementById("UsuariosIN").innerHTML;
            for (let k = 0; k < Usuarios.length; k++) {
                if (Usuarios[k].UserName == j) {
                    if (Usuarios[k].id == UsuarioI[0].id) {
                        document.getElementById("UsuarioClase").style.color = "red"
                        document.getElementById("UsuarioClase").value = "Eres tú"
                        setTimeout(function () {
                            document.getElementById("UsuarioClase").value = "";
                            document.getElementById("UsuarioClase").style.color = "black";
                        }, 1000);
                    } else {
                        inner = inner + '<div class="Etiqueta"><p>Usuario:' + j + '</p></div>';
                        document.getElementById("UsuariosIN").innerHTML = inner;
                        SubirUsu[i] = j;
                        document.getElementById("UsuarioClase").value = "";
                        console.log("Esto es SubirUsu" + SubirUsu[i]);
                        i++;
                    }
                } else {
                    document.getElementById("UsuarioClase").style.color = "red"
                    document.getElementById("UsuarioClase").value = "No existe"
                    setTimeout(function () {
                        document.getElementById("UsuarioClase").value = "";
                        document.getElementById("UsuarioClase").style.color = "black";
                    }, 1000);
                }
            }


        }
    }
    SubirUsuario2 = () => {
        let i = document.getElementById("UsuarioClase2");
        if (i.value != "") {
            let bool1 = false;
            for (let k = 0; k < Clases.length; k++) {
                if (Clases[k].id == i.value) {
                    bool1 = true;
                }
            }
            if (bool1 == true) {
                let fecha = new Date();
                User_clase.push({
                    id: User_clase.length,
                    idusuario: UsuarioI[0].id,
                    idclase: i.value,
                    fechaU: new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 1))
                });
                this.setState({
                    Clase: Clases.filter(Esito => UsuarioI[0].id == Esito.idusuario),
                    Usuario_C: User_clase.filter(Esito => UsuarioI[0].id == Esito.idusuario),
                });
                i.value = "";
                document.getElementById("PopUp2").style.display = "none";
            } else {
                i.style.color = "red";
                i.type = "text";
                i.value = "Clase no encontrada.";
                setTimeout(function () {
                    i.value = "";
                    i.style.color = "black";
                    i.type = "number";
                }, 1000);
            }
        } else {
            i.style.color = "red";
            i.type = "text";
            i.value = "Dato no ingresado.";
            setTimeout(function () {
                i.value = "";
                i.style.color = "black";
                i.type = "number";
            }, 1000);
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Este get trae las clases creadas*/
    getClasesC = async () => {
        await axios.get(`http://localhost:3883/Cla/Get-Clases-Creadas/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({ DataClase: res.data })
            }).catch(err => {
                console.error(err);
            })
    }
    /*Este get trae las clases inscritas*/
    getClasesI = async () => {
        console.log("");
        await axios.get(`http://localhost:3883/UsuCla/get-usario_claseJOINclases-todo/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({
                    DataClaseI: res.data
                });
            }).catch(err => {
                console.error(err);
            })

    }
    render() {
        return (
            <>
                {this.Modal1Return()}
                <div className="contM5">
                    <div className="buscadorClases">
                        <div className="filtroClasesSearch">
                            <div className="filtroClasesSearch2">
                                <input type="text" className="FiltrosC2 buscadorClases2" placeholder="buscar"></input>
                            </div>
                        </div>
                        <div className="BotonMore">
                            <img className="BotonMoreImage" src="/Images/Mas.png" onClick={() => this.Modal1()} />
                        </div>
                    </div>
                    <div className="franja">
                        <div id="infop">
                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases creadas ▼" id="ClasesC" onClick={this.Accion1} />
                            </div>
                            <div id="clasesP">

                                <div id="clasesP2">
                                    {this.state.DataClase.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3 className="TitleCardClase">{Esito.titulo}</h3>
                                                    <Link to={{ pathname: "/Clase", state: { InfoClass: Esito } }}><input type="button" value="Ir" /></Link>
                                                </div>
                                                <div className="botoncard">
                                                    <h4 className="FechaCClase">Fecha de creacion: <br />
                                                        {new Date(Esito.fecha_c).toLocaleDateString()}
                                                    </h4>
                                                    <div className="InfoClassCard">
                                                        <h4 className="InfoClassCardConte ">Usuarios: {Esito.cont_usuarios}</h4>
                                                        <h4 className="InfoClassCardConte">Id: {Esito.id_clase}</h4>
                                                    </div>

                                                </div>
                                            </div>
                                        </>);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div id="conclases">

                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases inscritas ▼" id="ClasesP" onClick={this.Accion2} />
                            </div>
                            <div id="contidU">
                                <div id="contidU2">
                                    {this.state.DataClaseI.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3 className="TitleCardClase">{Esito.titulo}</h3>
                                                    <Link to={{ pathname: "/Clase", state: { InfoClass: Esito } }}><input type="button" value="Ir" /></Link>
                                                </div>
                                                <div className="botoncard">
                                                    <h4 className="FechaCClase">Fecha de creacion:<br />
                                                        {new Date(Esito.fecha_c).toLocaleDateString()}
                                                    </h4>
                                                    <h4 className="InfoClassCardConte">Usuarios: {Esito.cont_usuarios}</h4>
                                                    <h4 className="InfoClassCardConte">Id: {Esito.id_clase}</h4>
                                                </div>
                                            </div>
                                        </>);
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main5);
