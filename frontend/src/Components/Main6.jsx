import React from 'react';
import '../Styles/Main6.css';

import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Progreso } from '../Utiles/Mocks/progreso';
import { Cursos } from '../Utiles/Mocks/Cursos';
import { Link } from 'react-router-dom';

let bool = true, bool2 = true;

class Main6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Progresos: Progreso.filter(Esito => Esito.idUsuario == UsuarioI[0].id),
            CursosC: Cursos.filter(Esito => Esito.idCreador == UsuarioI[0].id)
        }
    }

    componentDidMount() {
        /*Cursos Iniciados*/
        if (this.state.Progresos.length > 5) {
            document.getElementById("Main6I").style.overflowY = "scroll";
        }
        if (this.state.Progresos.length == 0) {
            document.getElementById("CardsInner").style.display = "flex";
            document.getElementById("CardsInner").style.justifyContent = "center";
            document.getElementById("CardsInner").style.alignItems = "center";
            document.getElementById("CardsInner").innerHTML = "<p>No has iniciado ningún curso.</p>";
        }
        /*Cursos Creados*/
        if (this.state.CursosC.length >= 2) {
            document.getElementById("Main6C").style.overflowY = "scroll";
        }
        if (this.state.CursosC.length == 0) {
            document.getElementById("CardsInner2").style.display = "flex";
            document.getElementById("CardsInner2").style.justifyContent = "center";
            document.getElementById("CardsInner2").style.alignItems = "center";
            document.getElementById("CardsInner2").innerHTML = "<p>No has creado ningún curso.</p>";
        }
    }

    Accion1 = () => {
        if (!bool) {
            document.getElementById("CardsInner").style.display = "block";
            document.getElementById("CursosI").innerHTML = "Cursos iniciado ▼";
            if (this.state.Progresos.length == 0) {
                document.getElementById("CardsInner").style.display = "flex";
                document.getElementById("CardsInner").style.justifyContent = "center";
                document.getElementById("CardsInner").style.alignItems = "center";
                document.getElementById("CardsInner").innerHTML = "<p>No has iniciado ningún curso.</p>";
            }
            bool = true
        } else {
            document.getElementById("CursosI").innerHTML = "Cursos iniciado ►"
            document.getElementById("CardsInner").style.display = "none";
            bool = false
        }
    }
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("CardsInner2").style.display = "block";
            document.getElementById("CursosC").innerHTML = "Mis cursos ▼";
            if (this.state.CursosC.length == 0) {
                document.getElementById("CardsInner2").style.display = "flex";
                document.getElementById("CardsInner2").style.justifyContent = "center";
                document.getElementById("CardsInner2").style.alignItems = "center";
                document.getElementById("CardsInner2").innerHTML = "<p>No creado ningún curso.</p>";
            }
            bool2 = true
        } else {
            document.getElementById("CardsInner2").style.display = "none";
            document.getElementById("CursosC").innerHTML = "Mis cursos ►";
            bool2 = false
        }
    }
    render() {
        return (
            <>

                <div id="Main6Container">
                    <div id="Main6I">
                        <div className="ButtonMisCursosC">
                            <button className="button buttonMisCursos CIMB" id="CursosI" onClick={this.Accion1}>Cursos iniciado ▼</button>
                        </div>
                        <div id="CardsInner">
                            {this.state.Progresos.map((Esito, index) => {
                                return (
                                    <>
                                        <div key={index} className="CardCIMisC">
                                            <div className="marignC">
                                                <h3 className="marignO">{Cursos[Esito.idCurso].titulo}</h3>
                                                <p className="marignO">{Cursos[Esito.idCurso].Tipo}</p>
                                            </div>
                                            <Link className="ReanudarC" to={{
                                                pathname: "/Curso",
                                                state: {
                                                    id: Esito.idCurso,
                                                    pagina: Esito.Tipo
                                                }
                                            }}>
                                                <button className="Reanudar">Reanudar</button>
                                            </Link>
                                        </div>
                                    </>
                                );
                            })}

                        </div>
                    </div>
                    <div id="Main6C">
                        <div className="ButtonMisCursosC">
                            <Link to={{pathname:"/CrearCurso", state: {location: "/misCursos"}}} className="ButtonMisCursosC">
                                <button className="button buttonMisCursos">Crear curso</button>
                            </Link>
                            <button className="button buttonMisCursos" id="CursosC" onClick={this.Accion2}>Mis cursos ▼</button>
                        </div>
                        <div id="CardsInner2">
                            {this.state.CursosC.map((Esito, index) => {
                                return (
                                    <div id="MaxContC" key={index}>
                                        <div className="InfoContMinI2">
                                            <h3 className="TitleC TitlesI">{Esito.titulo}</h3>
                                        </div>
                                        <div className="CursoIC" key={index}>
                                            <img className="ImgCI" src={Esito.Url} />
                                            <div className="CursoIC2">
                                                <div className="InfoContMini">
                                                    <h5 className="TitlesI">Tematica: <br /> {Esito.Tematica}</h5>
                                                    <h5 className="TitlesI">Materia: <br /> {Esito.Materia}</h5>
                                                </div>
                                                <div id="BottonCI">
                                                    <img className="Edit2" src="/Images/InfoCurso.png" />
                                                    <Link to={{
                                                        pathname: "/EditarCurso",
                                                        state: {
                                                            id: Esito.id
                                                        }
                                                    }}>
                                                        <button className="button buttonI">Editor curso</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default Main6;