import React from 'react';
import Header4 from '../Components/Header4';
import axios from 'axios';
import '../Styles/CalificacionesClases.css';
let bool = true, bool2 = true;
class CalificacionesClaseCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCalificaciones: [],
            Iniciados: [],
            NoIniciados: []
        }
    }
    componentDidMount = async () => {
        let retorno = await this.getNotas();
        let filtrado = retorno.data.filter(filter => filter.calificacion != null);
        let filtrado2 = retorno.data.filter(filter => filter.calificacion == null);
        console.log(filtrado);
        this.setState({
            dataCalificaciones: retorno.data,
            Iniciados: filtrado,
            NoIniciados: filtrado2
        });
    }
    componentDidUpdate = () => {
        document.getElementById("carga").style.display = "none";
    }
    getNotas = async () => {
        return axios.get(`https://learnwithus2020.herokuapp.com/Cla/GET-CLASES-CALIFICACIONCURSOS/${this.props.location.state.InfoClass.id_clase}&${this.props.location.state.Curso.id}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    Accion1 = () => {
        if (!bool) {
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("ClasesC").value = "Usuarios evaluados ▼";
            bool = true
        } else {
            document.getElementById("ClasesC").value = "Usuarios evaluados ►"
            document.getElementById("clasesP2").style.display = "none";
            bool = false
        }
    }
    /*Permite ocultar y/o mostrar las clases inscritas*/
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("ClasesP").value = "Usuarios no evaluados ▼";
            bool2 = true
        } else {
            document.getElementById("ClasesP").value = "Usuarios no evaluados ►"
            document.getElementById("contidU2").style.display = "none";
            bool2 = false
        }
    }
    Accion1Return = () => {
        if (this.state.Iniciados?.length == 0) {
            return (
                <>
                    <p>No hay usuarios que hayan sido evaluados.</p>
                </>
            );
        }
    }
    Accion2Return = () => {
        if (this.state.NoIniciados?.length == 0) {
            return (
                <>
                    <p>No hay usuarios que hayan sido calificados.</p>
                </>
            );
        }
    }
    render() {
        return (
            <>
                <Header4 />
                <div className="Cargando" id="carga"></div>
                <div className="contM52">
                    <div className="franja">
                        <div id="infop">
                            <div className="ButtonMisCursosC">
                                <input type="button" value="Usuarios evaluados ▼" id="ClasesC" onClick={this.Accion1} />
                            </div>
                            <div id="clasesP">
                                <div id="clasesP2">
                                    {this.Accion1Return()}
                                    {this.state.Iniciados?.map((Esito, Index) => {
                                        return (
                                            <>
                                                <div className="CardCalificacion">
                                                    <div className="Porciento70">
                                                        <p>{Esito.nombreCompleto}</p>
                                                    </div>
                                                    <div className="Porciento30">
                                                        <p>{Esito.calificacion}</p>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div id="conclases">
                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases no evaluados ▼" id="ClasesP" onClick={this.Accion2} />
                            </div>
                            <div id="contidU">
                                <div id="contidU2">
                                    {this.Accion2Return()}
                                    {this.state.NoIniciados.map((Esito, Index) => {
                                        return (
                                            <>
                                                <div className="CardCalificacion">
                                                    <div className="Porciento70">
                                                        <p>{Esito.nombreCompleto}</p>
                                                    </div>
                                                    <div className="Porciento30">
                                                        <p>{Esito.calificacion}</p>
                                                    </div>
                                                </div>
                                            </>
                                        );
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

export default CalificacionesClaseCurso;