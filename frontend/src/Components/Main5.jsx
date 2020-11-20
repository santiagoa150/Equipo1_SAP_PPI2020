import React from 'react';
import '../Styles/Main5.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Clases } from '../Utiles/Mocks/Clases';
import { User_clase } from '../Utiles/Mocks/User_clase';
import { Usuarios } from '../Utiles/Mocks/Usuarios';
let bool = true, bool2 = true,SubirUsu  = new Array(), i = 0;
class Main5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clase: Clases.filter(Esito => UsuarioI[0].id == Esito.idusuario),
            Usuario_C: User_clase.filter(Esito => UsuarioI[0].id == Esito.idusuario),
        }
    }
    componentDidMount() {
        /*CLASES CREADAS*/
        if (this.state.Clase.length == 0) {
            document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("clasesP2").style.justifyContent = "center";
        }

        if (this.state.Usuario_C.length == 0) {
            document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>"
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("contidU2").style.justifyContent = "center";
        }
    }
    Accion1 = () => {
        if (!bool) {
            document.getElementById("clasesP2").style.display = "block";
            document.getElementById("ClasesC").value = "Clases creadas ▼";
            if (this.state.Clase.length == 0) {
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
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("contidU2").style.display = "block";
            document.getElementById("ClasesP").value = "Clases inscritas ▼";
            if (this.state.Usuario_C.length == 0) {
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
    CrearClase = () => {
        document.getElementById("PopUp1").style.display = "flex";
    }
    Close1 = () => {
        document.getElementById("PopUp1").style.display = "none";
        document.getElementById("UsuariosIN").innerHTML = "";
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
                if (Usuarios[k].UserName == j ) {
                    if(Usuarios[k].id == UsuarioI[0].id){
                        document.getElementById("UsuarioClase").style.color = "red"
                        document.getElementById("UsuarioClase").value = "Eres tú"
                        setTimeout(function () {
                            document.getElementById("UsuarioClase").value = "";
                            document.getElementById("UsuarioClase").style.color = "black";
                        }, 1000);
                    }else{
                        inner = inner + '<div class="Etiqueta"><p>Usuario:' + j + '</p></div>';
                        document.getElementById("UsuariosIN").innerHTML = inner;
                        SubirUsu[i] = j;
                        document.getElementById("UsuarioClase").value = "";
                        console.log("Esto es SubirUsu" + SubirUsu[i]);
                    i++;}
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
    UnirUser = () => {
        document.getElementById("PopUp2").style.display = "flex";
    }
    Close2 = () => {
        document.getElementById("PopUp2").style.display = "none";
        document.getElementById("UsuarioClase2").value = "";
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
    render() {
        return (
            <>
                <div className="PopUp2" id="PopUp2">
                    <div className="PopUp2_">
                        <h3>Agregar Usuario</h3>
                        <div className="Group GroupC2 GroupC3">
                            <div>
                                <div>
                                    <p className="Group">Id clase</p>
                                    <input type="text" className="inputCrearClase Group" id="UsuarioClase2" autoComplete="off" />
                                </div>
                            </div>
                            <input type="button" className="inputCrearClase2" onClick={this.SubirUsuario2} />
                        </div>
                        <button className="BotonMadreClase bmargintop" onClick={this.Close2}>Cancelar</button>
                    </div>
                </div>
                <div className="PopUp1" id="PopUp1">
                    <div className="PopUp1_">
                        <div id="PopUpPart1">
                            <h3>Crear clase</h3>
                            <div className="GroupC">
                                <p className="Group">Nombre</p>
                                <input type="text" id="NombreClase" className="Group inputCrearClase" autoComplete="off" />
                            </div>
                            <div className="GroupC">
                                <p className="Group">Usuario</p>
                                <div className="Group GroupC2">
                                    <input type="text" className="inputCrearClase" id="UsuarioClase" autoComplete="off" />
                                    <input type="button" className="inputCrearClase2" onClick={this.SubirUsuario1} />
                                </div>
                            </div>
                        </div>
                        <div id="PopUpPart2">
                            <div id="UsuariosIN">

                            </div>
                        </div>
                        <div id="XimageCrearClase">
                            <button onClick={this.Close1} className="BotonMadreClase">Cancelar</button>
                            <button onClick={this.CrearClase2} className="BotonMadreClase">Aceptar</button>
                        </div>
                    </div>
                </div>
                <div className="contM5">
                    <div className="franja">
                        <div id="infop">
                        <div className="ButtonMisCursosC">
                                    <input type="button" value="Crear" onClick={this.CrearClase} />
                                    <input type="button" value="Clases creadas ▼" id="ClasesC" onClick={this.Accion1} />
                        </div>
                            <div id="clasesP">

                                <div id="clasesP2">
                                    {this.state.Clase.map((Esito, Index) => {
                                        let variable = 0;
                                        for (let i = 0; i < User_clase.length; i++) {
                                            if (Esito.id == User_clase[i].idclase) {
                                                variable = variable + 1;
                                            }
                                        }
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3>{Esito.titulo}</h3>
                                                    <h4>Fecha de creacion: <br />
                                                        {Esito.fechaC.toLocaleDateString()}
                                                    </h4>
                                                </div>
                                                <div className="botoncard"><Link to={{ pathname: "/Clase/" + Esito.id, state: { InfoClass: Esito } }}><input type="button" value="Ir" /></Link>
                                                    <div className="InfoClassCard">
                                                        <h4 className="InfoClassCardConte">Id: {Esito.id}</h4>
                                                        <h4 className="InfoClassCardConte DisCel">Usuarios: {variable}</h4>
                                                    </div>
                                                </div>
                                                <div className="UsuarioInfoCardAbajo">
                                                    <h4 className="InfoClassCardConte DisCom">Usuarios: {variable}</h4>
                                                </div>
                                            </div>

                                        </>);
                                    })}
                                </div>
                            </div>
                            {/*<div id="botonear"><input type="button" value="Unirse" onClick={this.UnirUser} /><input type="button" value="Crear" onClick={this.CrearClase} /></div>*/}
                        </div>
                        <div id="conclases">
                        
                            <div className="ButtonMisCursosC">
                                    <input type="button" value="Unirse" onClick={this.UnirUser} />
                                    <input type="button" value="Clases inscritas ▼" id="ClasesP" onClick={this.Accion2} />
                                </div>
                            <div id="contidU">
                                
                                <div id="contidU2">
                                    {this.state.Usuario_C.map((Esito, Index) => {
                                        let variable = 0;
                                        for (let i = 0; i < User_clase.length; i++) {
                                            if (Clases[Esito.idclase].id == User_clase[i].idclase) {
                                                variable = variable + 1;
                                            }
                                        }

                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3>{Clases[Esito.idclase].titulo}</h3>
                                                    <h4>Fecha de creacion:<br />
                                                        {Clases[Esito.idclase].fechaC.toLocaleDateString()}
                                                    </h4>
                                                </div>
                                                <div className="botoncard">
                                                    <Link  to={{pathname: "/Clase/" + Esito.idclase, state:{InfoClass: Clases[Esito.idclase]}}}><input type="button" value="Ir"/></Link>
                                                    <h4 className="InfoClassCardConte">Id: {Esito.idclase}</h4>
                                                    <h4 className="InfoClassCardConte DisCel">Usuarios: {variable}</h4>
                                                </div>
                                                <div className="UsuarioInfoCardAbajo">
                                                    <h4 className="InfoClassCardConte DisCom">Usuarios: {variable}</h4>
                                                </div>
                                            </div>
                                        </>);
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.ComponentCharge}
            </>
        );
    }
}

export default withRouter(Main5);
