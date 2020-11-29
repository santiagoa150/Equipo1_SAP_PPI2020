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
            idCursoC: 0
        }
    }
    async componentDidMount() {
        await this.getCursosClase();
        await this.getUsuariosClase();
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
        await axios.get(`http://localhost:3883/Cur/get_cursos_informacion/Clase/${this.state.Clase.id_clase}`)
            .then(res => {
                this.setState({
                    DataCursosC: res.data
                })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este get trae todos los participantes de una clase*/
    getUsuariosClase = async () => {
        await axios.get(`http://localhost:3883/UsuCla/get-usuario_claseJOINclases-nombre_apellido/clase/${this.state.Clase.id_clase}`)
            .then(res => {

                console.log("ola ");
                this.setState({
                    DataUsuariosC: res.data
                })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
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
    render() {
        return (
            <>
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
                                            <div id="BottonCI">
                                                <div>
                                                    <img className="Edit2" src="/Images/InfoCurso.png" />
                                                </div>
                                                <Link to={{
                                                    pathname: "/Curso",
                                                    state: {
                                                        idCursoC: Esito.id
                                                    }
                                                }}>
                                                    <button className="button buttonI">Iniciar curso</button>
                                                </Link>
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
            </>
        );
    }
}

export default withRouter(Main7);