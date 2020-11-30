import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../Styles/CrearCurso.css';
let aja;
class CrearCursoTeorico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cantp: 0,
            ExamenCurso: [],
            bool: false,
            boleanosRedirect2: {
                bool1: false,
                bool2: false,
                bool3: false
            }, creando: true,
            index: 0,
            booleanoalahpta: false
        }
    }
    async componentDidMount() {
        await this.getContenidoE();
        let retorno = await this.cantidadPreguntas();
        document.getElementById("cantidad").value = retorno.data[0].cant_preguntas;
        this.setState({
            cantp: retorno.data[0].cant_preguntas
        })
    }
    componentDidUpdate() {
        document.getElementById("carga").style.display = "none";
    }

    /*METODOS QUE RETORNAN BOTONES*/
    /*Renderizado del botón guardar*/
    Botones = () => {
        let variable = 0;
        if (this.props.location.state.location == "/misCursos") {
            variable = 1;
        } else if (this.props.location.state.location == "/Clase") {
            variable = 2;
        } else {
            variable = 3;
        }
        return (
            <>
                <button className="button buttonMisCursos hoverCreadorT" onClick={() => { this.putContenidoE(); }}>Guardar</button>
            </>
        );
    }
    /*Renderizado del botón cancelar*/
    Botones2 = () => {
        if (this.props.location.state.location == "/misCursos") {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        } else if (this.props.location.state.location == "/Clase") {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        } else {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { pagina: "Comunidad", idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        }
    }
    /*ESTOS METODOS SE UTILIZAN EN LA CREACIÓN Y EDICIÓN DEL CONTENIDO Evaluativo*/
    /*Este metodo elimina un bloque de cotenido*/
    eliminarbloque = (x) => {
        let auxiliar = this.state.ExamenCurso;
        auxiliar.splice(x, 1);
        this.setState({
            ExamenCurso: auxiliar
        });
    }
    /*Este metodo sirve para editar un bloque insertado*/
    editarBloque = (x) => {
        this.state.index = x;
        this.state.creando = false;
        /*52*/
        document.getElementById("pregunta").value = this.state.ExamenCurso[x].pregunta;
        document.getElementById("respuesta").value = this.state.ExamenCurso[x].respuesta;
        document.getElementById("opcion1").value = this.state.ExamenCurso[x].opcion1;
        document.getElementById("opcion2").value = this.state.ExamenCurso[x].opcion2;
        document.getElementById("opcion3").value = this.state.ExamenCurso[x].opcion3;
    }
    timer = (obj) => {
        obj.style.color = "red";
        obj.value = "Parametro en blanco";
        setTimeout(() => {
            obj.style.color = "black";
            obj.value = "";
        }, 1000);
    }
    /*Este metodo sube el contenido teorico a los bloques del editor*/
    SubirContenido = () => {

        let pregunta = document.getElementById("pregunta");
        let respuesta = document.getElementById("respuesta");
        let opcion1 = document.getElementById("opcion1");
        let opcion2 = document.getElementById("opcion2");
        let opcion3 = document.getElementById("opcion3");
        let bool = true;
        let auxiliar = this.state.ExamenCurso;
        if (pregunta.value == "" || respuesta.value == "" || opcion1.value == "" || opcion2.value == "" || opcion3.value == "") {
            bool = false;
        }
        if (bool) {
            if (this.state.creando) {
                auxiliar.push({
                    pregunta: pregunta.value,
                    respuesta: respuesta.value,
                    opcion1: opcion1.value,
                    opcion2: opcion2.value,
                    opcion3: opcion3.value
                });
            } else {
                auxiliar[this.state.index].pregunta = pregunta.value;
                auxiliar[this.state.index].respuesta = respuesta.value;
                auxiliar[this.state.index].opcion1 = opcion1.value;
                auxiliar[this.state.index].opcion2 = opcion2.value;
                auxiliar[this.state.index].opcion3 = opcion3.value;
            }
            pregunta.value = "";
            respuesta.value = "";
            opcion1.value = "";
            opcion2.value = "";
            opcion3.value = "";
        } else {
            if (pregunta.value == "") {
                this.timer(pregunta);
            }
            if (respuesta.value == "") {
                this.timer(respuesta);
            }
            if (opcion1.value == "") {
                this.timer(opcion1);
            }
            if (opcion3.value == "") {
                this.timer(opcion2);
            }
            if (opcion3.value == "") {
                this.timer(opcion3);
            }
        }
        this.setState({
            ExamenCurso: auxiliar,
            creando: true,
            index: 0
        });
    }
    /*Este metodo actualiza el contenido teoríco del curso en la database*/
    ActualizacionContenidoE = async (numero) => {

        if (numero == 1) {
            this.setState({
                boleanosRedirect2: {
                    bool1: true
                }
            });
        } else if (numero == 2) {
            this.setState({
                boleanosRedirect2: {
                    bool2: true
                }
            });
        } else {
            this.setState({
                boleanosRedirect2: {
                    bool3: true
                }
            });
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Este metodo trae el contenido teoríco del curso que se está edianto*/
    getContenidoE = async () => {
        await axios.get(`https://learnwithus2020.herokuapp.com/Cur/get_preguntas_informacion/ContenidoE/${this.props.location.state.idCursoC}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    ExamenCurso: res.data
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*PUTS*/
    /*Este metodo actualiza el contenido teoríco del curso que se está editando*/
    putContenidoE = async () => {
        if (this.state.cantp == 0) {
            document.getElementById("cantidad").style.border = "2px red solid";
            setTimeout(() => {
                document.getElementById("cantidad").style.border = "1px black solid";
            }, 1500);
        } else {
            document.getElementById("carga").style.display = "none";
            await axios.delete(`https://learnwithus2020.herokuapp.com/Cur/delete-preguntas-informacion/CrearCurso/${this.props.location.state.idCursoC}`)
                .then(async (res) => {
                    for (let x = 0; this.state.ExamenCurso.length > x; x++) {
                        let form = await {
                            id_curso: this.props.location.state.idCursoC,
                            pregunta: this.state.ExamenCurso[x].pregunta,
                            respuesta: this.state.ExamenCurso[x].respuesta,
                            opcion1: this.state.ExamenCurso[x].opcion1,
                            opcion2: this.state.ExamenCurso[x].opcion2,
                            opcion3: this.state.ExamenCurso[x].opcion3
                        }

                        axios.post(`https://learnwithus2020.herokuapp.com/Cur/post_preguntas_curso/CrearExamen`, form)
                            .then(res => {
                                console.log(res.data);
                            }).catch(err => {
                                if (err) {
                                    console.error(err);
                                }
                            })
                    }
                }).catch(err => {
                    if (err) {
                        console.error(err);
                    }
                })

            axios.put(`https://learnwithus2020.herokuapp.com/Cur/put_cantidad_contenido-e/CrearExamen/${this.props.location.state.idCursoC}&${document.getElementById("cantidad").value}`)
                .then(res => {
                    console.log(res.data);
                }).catch(err => {
                    if (err) {
                        console.error(err);
                    }
                })
        }
    }
    cantidadPreguntas = async () => {
        return axios.get(`https://learnwithus2020.herokuapp.com/Cur/get_cursos_cantidadPreguntas/CrearContenidoE/${this.props.location.state.idCursoC}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    min = () => {
        if (this.state.ExamenCurso.length == 0) {
            return "0";
        } else {
            return "1";
        }
    }
    valid = () => {
        if (document.getElementById("cantidad").value < this.min() - 1) {
            document.getElementById("cantidad").value = this.min();
        } else if (document.getElementById("cantidad").value > this.state.ExamenCurso.length) {
            document.getElementById("cantidad").value = this.state.ExamenCurso.length;
        }
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                <div className="MainCrearCurso">
                    <div className="TableroCrearC">
                        <div className="MainTablero" id="tablero1">
                            {this.state.ExamenCurso.map((Esito, index) => {
                                return (
                                    <>
                                        <div className="cardcontenidoTeorico" key={index}>
                                            <div className="contenido">
                                                <p>Pregunta: {Esito.pregunta}
                                                    <br />Respuesta: {Esito.respuesta}
                                                    <br />Opcion1: {Esito.opcion1}
                                                    <br />Opcion2: {Esito.opcion2}
                                                    <br />Opcion3: {Esito.opcion3}</p>
                                            </div>
                                            <div className="basuraCrearCTContainer">
                                                <img src="./images/Lapiz.png" onClick={() => { this.editarBloque(index) }} className="basuraCrearCT" />
                                                <img src="./images/Basura.png" className="basuraCrearCT" onClick={() => { this.eliminarbloque(index) }} />
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className="InfoCrearC">
                        <div className="EditorCrearCurso">
                            <div className="Cien">
                                <p className="Group">Pregunta:</p>
                                <div className="ClassNameDivision">
                                    <textarea id="pregunta" className="TextAreaCCurso2 Group"></textarea>
                                    <button className="BotonSubirContenidoE" onClick={() => this.SubirContenido()}>Subir</button>
                                </div>
                                <p className="Group">Respuesta:</p>
                                <textarea id="respuesta" className="TextAreaCCurso Group"></textarea>
                                <p className="Group">Opcion1:</p>
                                <textarea id="opcion1" className="TextAreaCCurso Group"></textarea>
                                <p className="Group">Opcion2:</p>
                                <textarea id="opcion2" className="TextAreaCCurso Group"></textarea>
                                <p className="Group">Opcion3:</p>
                                <textarea id="opcion3" className="TextAreaCCurso Group"></textarea>
                            </div>
                        </div>
                        <div className="DivCantidadPreguntas2">
                            <p className="Group">Cantidad de preguntas: </p>
                            <div className="DivCantidadPreguntas">
                                <input type="number" className="CantPreguntasBoton" placeholder="Escriba aquí" id="cantidad" min={this.min()} max={this.state.ExamenCurso.length}
                                    onChange={
                                        () => {
                                            this.valid();
                                            this.setState({
                                                cantp: document.getElementById("cantidad").value
                                            });
                                        }
                                    } />
                            </div>
                        </div>
                        {this.Botones2()}
                        {this.Botones()}
                    </div>
                    {this.state.boleanosRedirect2.bool3 && <Redirect to={{ pathname: '/CrearCurso', state: { pagina: "Comunidad", idCursoC: this.props.location.state.idCursoC } }} />}
                    {this.state.boleanosRedirect2.bool2 && <Redirect to={{ pathname: '/CrearCurso', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }} />}
                    {this.state.boleanosRedirect2.bool1 && <Redirect to={{ pathname: '/CrearCurso', state: { location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }} />}
                </div>
            </>
        );
    }
}

export default withRouter(CrearCursoTeorico);