import React from 'react';
import '../Styles/Main6.css';

import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Progreso } from '../Utiles/Mocks/progreso';
import { Cursos } from '../Utiles/Mocks/Cursos';
import { Link } from 'react-router-dom';
 
let bool = true;

class Main6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Progresos: Progreso.filter(Esito => Esito.idUsuario == UsuarioI[0].id),
            CursosC: Cursos.filter(Esito => Esito.idCreador == UsuarioI[0].id)
        }
    }

    componentDidMount(){
        /*Cursos Iniciados*/
        if(this.state.Progresos.length > 30){
            document.getElementById("CardsInner").style.display = "none";
        }else if(this.state.Progresos.length == 0){
            document.getElementById("CardsInner").style.display = "flex";
            document.getElementById("CardsInner").style.justifyContent = "center";
            document.getElementById("CardsInner").style.alignItems = "center";
            document.getElementById("CardsInner").innerHTML = "<p>No has iniciado ningún curso.</p>";
        }
        /*Cursos Creados*/
        if(this.state.CursosC.length == 0){
            document.getElementById("CardsInner2").style.display = "flex";
            document.getElementById("CardsInner2").style.justifyContent = "center";
            document.getElementById("CardsInner2").style.alignItems = "center";
            document.getElementById("CardsInner2").innerHTML = "<p>No has creado ningún curso.</p>";
        }
    }

    algo(){
        if(bool){
            document.getElementById("CardsInner").style.display = "block";
            bool = false
        } else{
            document.getElementById("CardsInner").style.display = "none";
            bool = true
        }
    }

    render() {
        return (
            <>

                <div id="Main6Container">
                    <div id="Main6I">
                        <button className="button buttonMisCursos" onClick={this.algo}>Cursos iniciado</button>
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
                        <button className="button buttonMisCursos">Crear curso</button>
                        <button className="button buttonMisCursos">Mis cursos</button>
                        <div id="CardsInner2">
                            {this.state.CursosC.map((Esito, index) =>{
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
                                                <Link to={{pathname:"/EditarCurso", 
                                                state:{
                                                    id: Esito.id
                                                }}}>
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