import React from 'react';
import axios from 'axios';
import '../Styles/pantcarga.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI'
class Main4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CursoData: [],
            preguntas: [],
            modal1: {
                modal1bool: false
            },
            boool: false,
            modal2bool: false

        }
    }
    async componentDidMount() {
        await this.getInfoCurso();
        await this.getPreguntas();
    }
    componentDidUpdate() {
        document.getElementById("carga").style.display = "none";
    } /*MODAL1*/
    /*Determina si el modal 1 se pinta o no*/
    /*Retorna el modal 1*/
    modal1Return = () => {
        if (this.state.modal1.modal1bool) {
            return (
                <>
                    <div className="ModalFondo">
                        <div className="Modal1">
                            <div className="ModalTitle">
                                <h2>Empezar examen</h2>
                            </div>
                            <p>
                                Si inicia el examen debera acabarlo este tiene {this.state.cant_preguntas} preguntas, ¿Desea continuar?
                            </p>
                            <button className="button buttonModal1" onClick={() => {
                                this.setState({
                                    boool: true
                                })
                            }
                            }>Continuar</button>
                            <button className="button buttonModal1" onClick={() => {
                                this.setState({
                                    modal1: {
                                        modal1bool: !this.state.modal1.modal1bool
                                    }
                                })
                            }
                            }>Cancelar</button>
                        </div>
                    </div>
                </>
            );

        }
    }

    modal2Return = () => {
        if (this.state.modal2bool) {
            return (
                <>
                    <div className="ModalFondo">
                        <div className="Modal1">
                            <div className="ModalTitle">
                                <h2>Incrustado</h2>
                            </div>

                            <p>
                                {() => {
                                    if (this.state.CursoData[0].d_permiso==1) {
                                        return "El codigo de incrustado de este juego es: "+this.state.CursoData[0].id ;
                                    }else{
                                        return "El creador de este curso lo bloqueo para que no se pudiera usar su juego como incrustado";
                                    }
                                }}
                            </p>

                            <button className="button buttonModal1" onClick={() => {
                                this.setState({
                                    modal2bool: !this.state.modal2bool
                                })
                            }
                            }>Cancelar</button>
                        </div>
                    </div>
                </>
            );

        }
    }
    getInfoCurso = async () => {
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
            .then(res => {
                this.setState({ CursoData: res.data });
                document.getElementById("TeoriaCurso").innerHTML = this.state.CursoData[0].contenido_t;
            }).catch(err => {
                console.error(err);
            })
    }
    getPreguntas = async () => {
        await axios.get(`http://localhost:3883/Cur/get_preguntas_informacion/ContenidoE/${this.props.location.state.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    preguntas: res.data
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    render() {
        return (
            <>
                {this.modal1Return()}
                {this.modal2Return()}
                <div className="Cargando" id="carga"></div>
                <div id="Main4Container">
                    <div id="TeoriaCurso">
                    </div>
                    <div id="DidaCurso">
                        <i></i>
                        <Link className="LinkCursoMain4" to={{
                            pathname: "/Didactico",
                            state: {
                                id: this.state.CursoData[0]?.id,
                                CursoData: this.state.CursoData[0]?.id,
                                pagina: this.props.location.state.pagina
                            }
                        }}>

                            <button >Jugar</button>
                        </Link>
                        <img src="./images/InfoCurso.png" className="incrustado" onClick={() => {
                                this.setState({
                                    modal2bool: !this.state.modal2bool
                                })
                            }
                            }/>
                    </div>
                    <div id="ExaCurso">
                        <button className="LinkCursoMain4" onClick={() => {
                            this.setState({
                                modal1: {
                                    modal1bool: !this.state.modal1.modal1bool
                                }
                            })
                        }}>Pruebate</button>
                    </div>
                </div>
                {this.state.boool && <Redirect to={{
                    pathname: "/Examen",
                    state: {
                        id: this.state.CursoData[0]?.id,
                        cantidad: this.state.CursoData[0]?.cant_preguntas,
                        preguntas: this.state.preguntas,
                        calificacion: this.state.CursoData[0]?.calificacion,
                        pagina: this.props.location.state.pagina
                    }
                }} />}
            </>
        );
    }
}

export default withRouter(Main4);