import React from 'react';
import '../Styles/Main5.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Clases } from '../Utiles/Mocks/Clases';
import { User_clase } from '../Utiles/Mocks/User_clase';
let bool = true, bool2 = true;
class Main5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clase: Clases.filter(Esito => UsuarioI[0].id == Esito.idusuario),
            Usuario_C: User_clase.filter(Esito => UsuarioI[0].id == Esito.idusuario)
        }
    }
    componentDidMount() {
        document.getElementById("imgclases").style.backgroundImage = "url(" + UsuarioI[0].image + ")";
        /*CLASES CREADAS*/
        if (this.state.Clase.length == 0) {
            document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>"
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

    render() {
        return (
            <>
                <div className="contM5">
                    <div className="franja">
                        <div id="infop">
                            <div id="imgclases"></div>
                            <div id="contid">Tu id:{UsuarioI[0].id}</div>
                            <div id="botonear"><input type="button" value="Unirse" /><input type="button" value="Crear" /></div>
                        </div>
                        <div id="conclases">
                            <div id="clasesP">
                                <div className="ButtonMisCursosC">
                                    <input type="button" value="Clases creadas ▼" id="ClasesC" onClick={this.Accion1} />
                                </div>
                                <div id="clasesP2">
                                    {this.state.Clase.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3>{Esito.titulo}</h3>
                                                    <h4>Fecha de creacion: <br />
                                                        {Esito.fechaC.toLocaleDateString()}
                                                    </h4>
                                                </div>
                                                <div className="botoncard"><Link><input type="button" value="Ir" /></Link>
                                                    <h4>Id: {Esito.id}</h4>
                                                </div>
                                            </div>
                                        </>);
                                    })}
                                </div>
                            </div>

                            <div id="contidU">
                                <div className="ButtonMisCursosC">
                                <input type="button" value="Clases inscritas ▼" id="ClasesP" onClick={this.Accion2} />
                                </div>
                                <div id="contidU2">
                                    {this.state.Usuario_C.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3>{Clases[Esito.idclase].titulo}</h3>
                                                    <h4>Fecha de creacion:<br />
                                                        {Clases[Esito.idclase].fechaC.toLocaleDateString()}
                                                    </h4>
                                                </div>
                                                <div className="botoncard"><Link><input type="button" value="Ir" /></Link>
                                                    <h4>Id: {Esito.idclase}</h4>
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
