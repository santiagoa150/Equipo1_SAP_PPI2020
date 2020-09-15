import React from 'react';

import '../Styles/Perfil.css';
import Header from '../Components/Header1';
import Footer from '../Components/Footer';

import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Usuarios } from '../Utiles/Mocks/Usuarios';

import { Link, Redirect, withRouter } from 'react-router-dom';

let Fecha2 = "";
let Fecha = new Date();
let FechaY = Fecha.getFullYear();
let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
let FechaH = FechaY + "-" + FechaM + "-" + FechaD;
let FechaMin = (FechaY - 100) + "-" + FechaM + "-" + FechaD;
let aja, aja2, aja3 = false;

class Perfil extends React.Component {
    componentDidMount() {
        document.getElementById("FotoPerfíl").style.backgroundImage = "url(" + UsuarioI[0].image + ")";
    }
    constructor(props) {
        super(props);
        this.state = {
            Ola: true,
            UserB: false,
            ConB: false,
            ConB2: false,
            Bool: false
        }
    }
    prueba = () => {
        aja = false;
        try {
            let x = (UsuarioI[0].FechaN).getFullYear();
        }
        catch (e) {
            aja = true;
        }
    }
    fechapendeja = () => {
        Fecha2 = (UsuarioI[0].FechaN).getFullYear() + "-" + ((UsuarioI[0].FechaN).getMonth() + 1) + "-" + (UsuarioI[0].FechaN).getDate();
    }

    Edit = () => {
        if (this.state.Ola == true) {
            alert("Los datos que no desean ser cambiados se deben dejar en blanco.")
            document.getElementById("GroupIP2").style.display = "flex";
            let ArreClas = document.getElementsByClassName("Apar");
            let ArreClas2 = document.getElementsByClassName("PInfo2");
            let ArreClas3 = document.getElementsByClassName("Edit");
            for (let i = 0; i < ArreClas.length; i++) {
                ArreClas[i].style.display = "block";
            } for (let i = 0; i < ArreClas2.length; i++) {
                ArreClas2[i].style.display = "none";
            }
            for (let i = 0; i < ArreClas3.length; i++) {
                ArreClas3[i].style.backgroundImage = "url(/Images/Confirmar.png)";
            }
            this.setState({ Ola: false })
        } else {
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

            /*Contraseña*/
            if (Contraseña.value != "" && Contraseña2.value != "") {
                if (Contraseña.value == Contraseña2.value) {
                    Usuarios[UsuarioI[0].id].Contraseña = Contraseña.value;
                    UsuarioI[0].Contraseña = Usuarios[UsuarioI[0].id].Contraseña;
                }
            }
            /*Nombre*/
            if (Nombre.value != "") {
                Usuarios[UsuarioI[0].id].Nombre = Nombre.value;
                UsuarioI[0].Nombre = Usuarios[UsuarioI[0].id].Nombre;
            }
            /*Apellido*/
            if (Apellido.value != "") {
                Usuarios[UsuarioI[0].id].Apellido = Apellido.value;
                UsuarioI[0].Apellido = Usuarios[UsuarioI[0].id].Apellido;
            }
            /*UserName*/
            if (User.value != "" && this.state.UserB) {
                Usuarios[UsuarioI[0].id].UserName = User.value;
                UsuarioI[0].UserName = Usuarios[UsuarioI[0].id].UserName;
            }
            /*Correo*/
            if (correo.value != "") {
                Usuarios[UsuarioI[0].id].Correo = correo.value;
                UsuarioI[0].Correo = Usuarios[UsuarioI[0].id].Correo;
            }
            /*Sexo*/
            if (Sexo.value != 0) {
                Usuarios[UsuarioI[0].id].Sexo = Sexo.value;
                UsuarioI[0].Sexo = Usuarios[UsuarioI[0].id].Sexo;
            }
            /*Fecha*/
            if (FechaN.value != "") {
                Usuarios[UsuarioI[0].id].FechaN = new Date(edad.getFullYear() + "-" + (edad.getMonth() + 1) + "-" + (edad.getDate() + 1));
                Usuarios[UsuarioI[0].id].Edad = años;
                UsuarioI[0].FechaN = Usuarios[UsuarioI[0].id].FechaN;
                UsuarioI[0].Edad = Usuarios[UsuarioI[0].id].Edad;
            }

            document.getElementById("GroupIP2").style.display = "none";
            let ArreClas = document.getElementsByClassName("Apar");
            let ArreClas2 = document.getElementsByClassName("PInfo2");
            let ArreClas3 = document.getElementsByClassName("Edit");
            for (let i = 0; i < ArreClas.length; i++) {
                ArreClas[i].style.display = "none";
            } for (let i = 0; i < ArreClas2.length; i++) {
                ArreClas2[i].style.display = "block";
            }
            for (let i = 0; i < ArreClas3.length; i++) {
                ArreClas3[i].style.backgroundImage = "url(/Images/Lapiz.png)";
            }



            this.setState({
                Ola: true,
                Bool: true
            })

        }

    }

    UserName = () => {
        let User = document.getElementById("UP");
        for (let i = 0; i < Usuarios.length; i++) {

            if (Usuarios[i].UserName != User.value && Usuarios[i].id != UsuarioI[0].id) {
                this.setState({ UserB: true });
                User.style.color = "black";
            } else {
                this.setState({ UserB: false });
                User.style.color = "red";
            }
        }
    }

    Borrartusdatos = () => {
        UsuarioI.splice(0, 1);
    }
    Close = () => {
        document.getElementById("PopUpPerfíl").style.display = "none";
    }
    Activate = () => {
        document.getElementById("PopUpPerfíl").style.display = "flex";
    }
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
    Subir2 = () => {
        let inpu = document.getElementById("Elprota");
        if (inpu.files && inpu.files[0]) {
            UsuarioI[0].image = aja2;
            console.log(UsuarioI[0].id);
            Usuarios[UsuarioI[0].id].image = aja2;

            document.getElementById("FotoPerfíl").style.backgroundImage = "url(" + UsuarioI[0].image + ")";
            document.getElementById("PopUpPerfíl").style.display = "none";
        }
    }


    render() {



        return (
            <>
                <div id="PopUpPerfíl">
                    <div id="ContenedorPopUp">
                        <div id="XimageC" className="EsitoPapi">
                            <img id="Ximage" onClick={this.Close} src="https://images.vexels.com/media/users/3/155473/isolated/preview/faa3172dd52035d0c227d7ecab4d6024-doodle-cruzado-x-by-vexels.png" />
                        </div>
                        <form id="formProta" encType="multipart/form-data">
                            <input id="Elprota" accept="image/*" onChange={this.Subir} type="file" />
                        </form>
                        <img id="PrevImg" className="PrevImg" />
                        <Link className="SubImg" to={{
                            pathname: "/Perfíl",
                            state: { x: this.props.location.state.x }
                        }}>
                            <button className="button SubImg2" onClick={this.Subir2}>Subir</button>
                        </Link>
                    </div>
                </div>
                <Header />
                <div className="centrar">
                    <div id="PerfilContainer">
                        <div id="FotoContainer">
                            <div id="FotoAndEC">
                                <div id="FotoPerfíl" onClick={this.Activate}>

                                </div>

                            </div>
                        </div>
                        <div id="InfoPContainer">
                            <div className="GroupIP">
                                <p className="PInfo">Nombre:</p>
                                <input className="None Apar PInfo" id="NP" type="text" placeholder={UsuarioI[0].Nombre} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].Nombre}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Apellido:</p>
                                <input className="None Apar PInfo" id="AP" type="text" placeholder={UsuarioI[0].Apellido} autoComplete="off" />
                                <p className="PInfo PInfo2"> {UsuarioI[0].Apellido}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Usuario:</p>
                                <input className="None Apar PInfo" id="UP" type="text" placeholder={UsuarioI[0].UserName} onChange={this.UserName} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].UserName}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Correo:</p>
                                <input className="None Apar PInfo" id="EP" type="email" placeholder={UsuarioI[0].Correo} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].Correo}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Contraseña:</p>
                                <input className="None Apar PInfo" id="CP" type="password" placeholder={UsuarioI[0].Contraseña} autoComplete="off" />
                                <p className="PInfo PInfo2">{UsuarioI[0].Contraseña}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            <div id="GroupIP2">
                                <p className="PInfo">Confirmar Contraseña:</p>
                                <input className="None Apar PInfo" id="CP2" type="password" placeholder={UsuarioI[0].Contraseña} autoComplete="off" />
                                <div className="Edit" onClick={this.Edit}>

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
                                <p className="PInfo PInfo2">{UsuarioI[0].Sexo}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            {this.fechapendeja()}
                            <div className="GroupIP">
                                <p className="PInfo">Fecha de nacimiento:</p>
                                <input className="None Apar PInfo" id="FP" type="date" max={FechaH} min={FechaMin} autoComplete="off" />
                                <p className="PInfo PInfo2">{Fecha2}</p>
                                <div className="Edit" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Edad:</p>
                                <p className="PInfo">{UsuarioI[0].Edad}</p>
                                <div className="Edit2" onClick={this.Edit}>

                                </div>
                            </div>
                            <div className="GroupIP">
                                <p className="PInfo">Id:</p>
                                <p className="PInfo">{UsuarioI[0].id}</p>
                                <div className="Edit2">
                                </div>
                            </div>
                            {this.state.Bool && <Redirect to={this.props.location.state.x}></Redirect>}
                        </div>
                        <div id="ButtonPContainer">
                            <Link className="BP" to={this.props.location.state.x}>
                                <button className="BP">Atrás</button>
                            </Link>
                            <Link className="BP" to="/">
                                <button className="BP" onClick={this.Borrartusdatos}>Cerrar sesión</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Footer />

                {this.prueba()}
            </>
        );
    }

}

export default withRouter(Perfil);