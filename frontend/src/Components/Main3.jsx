import React from 'react';
import '../Styles/Main3.css';
import { Cursos } from '../Utiles/Mocks/Cursos';
import { Link, withRouter } from 'react-router-dom';

class Main3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtrado: Cursos.filter(Esito => Esito.Tipo == this.props.location.state.pagina)
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
                                        <option key={index} value={Esito.Materia}>{Esito.Materia}</option>
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
                        })}
                        <div><p>No hay mas cursos para mostrar</p></div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main3);