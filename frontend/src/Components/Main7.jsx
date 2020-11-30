import React from 'react';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { withRouter, Link, Redirect } from 'react-router-dom';
import '../Styles/Main7.css';
import axios from 'axios';
let newDate;
class Main7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clase: this.props.location.state.InfoClass,
            DataCursosC: [],
            DataUsuariosC: [],
            boolRedirec: false,
            idCursoC: 0,
            Modal1: {
                return: false,
                title: "",
                id: 0
            },
            idCursoC2: 0,
            DataCursosI: []
        }
    }
    async componentDidMount() {
        let retorno = await this.getCursosClase();
        let retorno2 = await this.getUsuariosClase();
        let retorno3 = await this.getCursoIniciado();
        this.setState({
            DataCursosC: retorno.data,
            DataUsuariosC: retorno2.data,
            DataCursosI: retorno3.data
        });
    }
    componentDidUpdate() {
        document.getElementById("carga").style.display = "none";
    }
    IniciarCurso = (prop, prop2) => {
        let Data = this.state.DataCursosI.filter(filtro => filtro.id_usuario == UsuarioI[0].id_usuario && filtro.id_curso == prop);
        if (Data.length != 0 || prop2 == UsuarioI[0].id_usuario) {
            return (
                <Link to={{
                    pathname: "/Curso",
                    state: {
                        id: prop,
                        pagina: this.props.location,
                        InfoClass: this.state.Clase
                    }
                }}>
                    <button className="button buttonI">Iniciar curso</button>
                </Link>
            );
        } else {
            return (
                <button className="button buttonI" onClick={() => this.postIniciarCurso(prop)}>Iniciar curso</button>
            );
        }
    }
    /*METODOS SIMPLES*/
    Accion1 = () => {
        if (this.state.Clase.id_creador == UsuarioI[0].id_usuario) {
            return (
                <button className="BClaseAccion" onClick={() => { this.postNewCurso(); this.getCrearCurso() }}>Crear curso</button>
            )
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Este get trae todos los cursos que hacen parte */
    getCursosClase = async () => {
        return axios.get(`http://localhost:3883/Cur/get_cursos_informacion/Clase/${this.state.Clase.id_clase}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este get trae todos los participantes de una clase*/
    getUsuariosClase = async () => {
        return axios.get(`http://localhost:3883/UsuCla/get-usuario_claseJOINclases-nombre_apellido/clase/${this.state.Clase.id_clase}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este get trae la id de un curso*/
    getCrearCurso = async () => {
        await axios.get(`http://localhost:3883/Cur/get_cursos_id/misCursos_Clase_CreateCurso/${UsuarioI[0].id_usuario}&${newDate}`)
            .then(res => {
                this.setState({
                    idCursoC: res.data[0].id,
                    boolRedirec: !this.state.boolRedirec
                })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*Este get trae los cursos iniciados*/
    getCursoIniciado = async () => {
        return axios.get(`http://localhost:3883/UsuCur/traer-UsuarioCalificacion/Integrado-Comunidad/${UsuarioI[0].id_usuario}`)
            .catch(err => {
                console.error(err);
            })
    }
    /*POST*/
    /*Este post crea un curso*/
    postNewCurso = async () => {
        let Fecha = new Date();
        let FechaY = Fecha.getFullYear();
        let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
        let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
        let FechaH = FechaY + "-" + FechaM + "-" + FechaD + " ";
        let Horas = "" + (Fecha.getHours().toString()).padStart(2, 0);
        let minutos = "" + (Fecha.getMinutes().toString()).padStart(2, 0);
        let seconds = "" + (Fecha.getSeconds().toString()).padStart(2, 0);
        newDate = FechaH + Horas + ":" + minutos + ":" + seconds;
        let form = {
            id_creador: UsuarioI[0].id_usuario,
            id_clase: this.state.Clase.id_clase,
            fecha_c: newDate,
            logo: "/Images/Cursos/Default.png"
        }
        axios.post(`http://localhost:3883/Cur/post_cursos_informacion/misCursos`, form)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Post para iniciar un curso*/
    postIniciarCurso = async (prop) => {
        let form = await {
            id_usuario: UsuarioI[0].id_usuario
        }
        console.log(form);
        axios.post(`http://localhost:3883/UsuCur/user-init-curso/${prop}`, form)
            .then(res => {
                this.setState({
                    IniciarCursoPost: {
                        idCursoC2: prop,
                        boolRedirec2: true
                    }
                })
            }).catch(err => {
                console.error(err);
            })
    }
    EliminarCurso = async (Prop) => {
        await axios.delete(`http://localhost:3883/Cur/delete-curso-informacion/paginas/${Prop}&${UsuarioI[0].id_usuario}`)
            .then(async (res) => {
                let x = await this.getCursosClase();
                this.setState({
                    Modal1: {
                        return: !this.state.Modal1.return,
                        title: "",
                        id: ""
                    },
                    DataCursosC: x.data
                })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*MODAL1*/
    /*Esta función activa o desactiva el modal1*/
    Modal1 = (prop, prop2) => {
        this.setState({
            Modal1: {
                return: !this.state.Modal1.return,
                title: prop,
                id: prop2
            }
        })
    }
    /*Esta función returna o no el Modal1*/
    Modal1Return = () => {
        if (this.state.Modal1.return) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres eliminar el curso {this.state.Modal1.title}?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.EliminarCurso(this.state.Modal1.id); }}>Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal1("", "")}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    RetornoOpciones = (Esito) => {
        if (UsuarioI[0].id_usuario == this.state.Clase.id_creador) {
            return (
                <div  className="ClaseEditar"> 
                <Link to={{pathname:"/CalificacionesClaseCurso", state:{InfoClass: this.props.location.state.InfoClass, return: "/Clase", titulo:`Resultados del curso ${Esito.titulo}`, Curso: Esito}}}>
                    <img className="Edit2" src="/Images/InfoCurso.png" />
                </Link>
                    <Link to={{
                        pathname: "/CrearCurso",
                        state: {
                            idCursoC: Esito.id,
                            location: "/Clase",
                            InfoClass: this.props.location.state.InfoClass
                        }
                    }}>
                        <img className="Edit2" src="/Images/Lapiz.png" />
                    </Link>
                    <img className="Edit2" src="/Images/Basura.png" onClick={() => { this.Modal1(Esito.titulo, Esito.id) }} />
                </div>
            );
        }
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                {this.Modal1Return()}
                <div id="Main7Container">
                    <div id="ClasesMain7">
                        {this.state.DataCursosC.map((Esito, index) => {
                            return (
                                <div id="MaxContC" className="MaxContC" key={index}>
                                    <div className="InfoContMinI2 Ola2____">
                                        <h3 className="TitleC TitlesI">{Esito.titulo}</h3>
                                    </div>
                                    <div className="CursoIC" key={index}>
                                        <img className="ImgCI" src={Esito.logo} />
                                        <div className="CursoIC2">
                                            <div className="InfoContMini">
                                                <h5 className="TitlesI">Tematica: <br /> {Esito.tematica}</h5>
                                                <h5 className="TitlesI">Materia: <br /> {Esito.materia}</h5>
                                            </div>
                                            <div id="BottonCI" className="BOTTONCI">
                                                {this.RetornoOpciones(Esito)}
                                                {this.IniciarCurso(Esito.id, Esito.id_creador)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                        })}
                    </div>
                    <div id="UsersMain7">
                        {this.Accion1()}
                        <button className="BClaseAccion">Ocultar</button>
                        {this.state.DataUsuariosC.map((Esito, index) => {
                            return (
                                <div key={index} className="User_card">
                                    <p>{Esito.concat}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {this.state.boolRedirec && <Redirect to={{ pathname: "/CrearCurso", state: { location: "/Clase", InfoClass: this.props.location.state.InfoClass, idCursoC: this.state.idCursoC } }} />}
                {this.state.boolRedirec2 && <Redirect to={{ pathname: "/Curso", state: { id: this.state.idCursoC2}}}></Redirect>}
            </>
        );
    }
}

export default withRouter(Main7);