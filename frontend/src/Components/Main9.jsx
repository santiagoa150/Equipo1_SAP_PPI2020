import React from 'react';
import '../Styles/Main9.css';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';

class Juego extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preguntas: this.props.location.state.preguntas,
            cant: this.props.location.state.cantidad,
            preguntaact: {},
            puntaje: 0,
            orden: [],
            cont: 0,
            pos: 0,
            calificacion: 0
        }
    }
    componentWillMount = () => {
        this.randome();
    }
    componentDidMount = () => {
        document.getElementById("carga").style.display = "none";
        this.getcalificacion();
    }
    componentWillUpdate() {
        document.getElementById("carga").style.display = "block";
    }
    componentWillReceiveProps() {
        document.getElementById("carga").style.display = "block";
    }
    componentDidUpdate = () => {
        document.getElementById("carga").style.display = "none";
    }
    componentWillUnmount = () => {
        if (this.state.calificacion == null) {
            this.putEvaluacion((Math.round((this.state.puntaje / this.state.cant) * 50)) / 10);
        }
    }
    getcalificacion = async () => {
        await axios.get(`http://localhost:3883/UsuCur/traer-calificacion/Examen/${UsuarioI[0].id_usuario}&${this.props.location.state.id}`)
            .then(res => {
                console.log(res.data[0]);
                this.setState({ calificacion: res.data[0].calificacion });
            }).catch(err => {
                console.error(err);
            })
    }
    randome = () => {
        if (this.state.preguntas.length > 0) {
            let pos = Math.floor(Math.random() * this.state.preguntas.length);
            let obj = this.state.preguntas;
            this.state.preguntaact = this.state.preguntas[pos];
            this.state.pos = pos;
            obj.splice(this.state.pos, 1);
            this.state.preguntas = obj;
        }
    }
    opciones = () => {
        let opciones = [false,
            false,
            false,
            false];
        let orden = [];
        while (!opciones[0] || !opciones[1] || !opciones[2] || !opciones[3]) {
            let pregunta = Math.floor(Math.random() * 4);
            if (pregunta == 0 && !opciones[0]) {
                orden.push(pregunta);
            } else if (pregunta == 1 && !opciones[1]) {
                orden.push(pregunta);
            } else if (pregunta == 2 && !opciones[2]) {
                orden.push(pregunta);
            } else if (pregunta == 3 && !opciones[3]) {
                orden.push(pregunta);
            }
            opciones[pregunta] = true;
        }
        this.state.orden = orden;

    }
    evaluar = (x) => {
        let puny = this.state.puntaje;
        let cont = this.state.cont;
        let elemento = document.getElementById("boton" + x).value;
        if (elemento == this.state.preguntaact.respuesta) {
            puny++;
        }
        cont++;
        this.randome();
        this.setState({
            puntaje: puny,
            cont: cont,
        });
    }
    putEvaluacion = async (prop) => {
        await axios.put(`http://localhost:3883/UsuCur/Put_Usuario-calificacion_calificacion/Comunidad/${UsuarioI[0].id_usuario}&${this.props.location.state.id}&${prop}`)
            .then(res => {
            }).catch(err => {
                console.log(err);
            });
    }
    /*Metodo que define si se pinta una pregunta o si se pinta un renderizado*/
    finalizar = () => {
        if (this.state.cant == 0) {
            return (
                <div className="Porciento1002">
                    <img className="Porciento100IMG2" src="/Images/ContenidoECurso.png"></img>
                </div>);
        } else if (this.state.cont < this.state.cant) {
            return (
                <>
                    <div className="cont_pregu">
                        <h1 className="pregunta">{this.state.preguntaact?.pregunta}</h1>
                    </div>
                    {this.opciones()}
                    <div className="opcionesJ">
                        {this.state.orden.map((Esito, Index) => {
                            if (Esito == 0) {
                                return (
                                    <>
                                        <button value={this.state.preguntaact?.respuesta} className="botonJ" id={"boton" + Index} onClick={() => { this.evaluar(Index) }}>{this.state.preguntaact.respuesta}</button>
                                    </>);
                            } else if (Esito == 1) {
                                return (
                                    <>
                                        <button value={this.state.preguntaact?.opcion1} className="botonJ" id={"boton" + Index} onClick={() => { this.evaluar(Index) }} >{this.state.preguntaact.opcion1}</button>
                                    </>);
                            } else if (Esito == 2) {
                                return (
                                    <>
                                        <button value={this.state.preguntaact?.opcion2} className="botonJ" id={"boton" + Index} onClick={() => { this.evaluar(Index) }} >{this.state.preguntaact.opcion2}</button>
                                    </>);
                            } else if (Esito == 3) {
                                return (
                                    <>
                                        <button value={this.state.preguntaact?.opcion3} className="botonJ" id={"boton" + Index} onClick={() => { this.evaluar(Index) }} >{this.state.preguntaact.opcion3}</button>
                                    </>);
                            }
                        })}
                    </div>
                </>
            );
        }
        else {
            return (
                <>
                    <div className="ModalJuego">
                        <div className="ModalJuegoTitle">
                            <h1 className="Acabar">Acabaste <br /> Acertaste {this.state.puntaje} preguntas</h1>
                        </div>
                        <h1 className="Acabar">Tu calificacion es de: {(Math.round((this.state.puntaje / this.state.cant) * 50)) / 10}</h1>
                        <Link to="/misCursos">
                            <input type="button" value="Volver" className="botonV" />
                        </Link>
                    </div>

                </>
            );
        }
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                <div className="juegoF">
                    {this.finalizar()}
                </div>
            </>
        );
    }
}

export default withRouter(Juego);