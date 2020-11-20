import React from 'react';
import '../Styles/Main3.css';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
class Main3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtrado: [],
            variablependeja: ""/*,
            body: {materia: "", fecha_c: "", titulo: "asfsfas"}*/
        }
    }
    componentDidMount = () => {
        
        axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/${this.props.location.state.pagina}`)
            .then(res => {
                this.setState({ filtrado: res.data })
            }).catch(err => {
                console.error(err);
            });
    }
    Accion1 = (prop) =>{
        if(prop == UsuarioI[0].id_usuario){
            return(
                <>
                    <img className="Edit2" src="/Images/Lapiz.png" />
                </>
            );
        }else{
            return(
                <>
                <img className="Edit2" src="/Images/Star.png" />
                </>
            );
            
        }
    }
        render() {
        return (
            <>
                <div className="flex">
                    <div className="Filtros">
                        <div className="Filtros2">
                            <input placeholder="Nombre" className="FiltrosC2" />
                            <select className="FiltrosC">
                                <option className="None" value="0">Materia</option>
                                {this.state.filtrado.map((Esito, index) => {
                                    return (
                                        <option key={index} value={Esito.materia}>{Esito.materia}</option>
                                    );
                                })}
                            </select>
                            <select className="FiltrosC">
                                <option className="None" value="0">Año de creación</option>
                                <option>2020</option>
                            </select>
                        </div>
                    </div>
                    <div className="CardCI">
                        {this.state.filtrado.map((Esito, index) => {
                            if (Esito.categoria == "Integrado") {
                                return (
                                    <div id="MaxContC" key={index}>
                                        <div className="InfoContMinI2">
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
                                                    {/* <img className="Edit2" src="/Images/InfoCurso.png" /> */}
                                                    <Link to={{
                                                        pathname: "/Curso",
                                                        state: {
                                                            id: Esito.id
                                                        }
                                                    }}>
                                                        <button className="button buttonI">Iniciar curso</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div id="MaxContC" key={index}>
                                        <div className="InfoContMinI2">
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
                                                    {this.Accion1(Esito.id_usuario)}
                                                    <Link to={{
                                                        pathname: "/Curso",
                                                        state: {
                                                            id: Esito.id
                                                        }
                                                    }}>
                                                        <button className="button buttonI">Iniciar curso</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="minicont">
                                            <h3 className="TitleC TitlesI">{Esito.usuario}</h3>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        <div><p>No hay mas cursos para mostrar</p></div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main3);