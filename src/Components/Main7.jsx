import React from 'react';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Usuarios } from '../Utiles/Mocks/Usuarios';
import { User_clase } from '../Utiles/Mocks/User_clase';
import { withRouter, Link } from 'react-router-dom';
import '../Styles/Main7.css';
import {Cursos} from '../Utiles/Mocks/Cursos';
class Main7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clase: this.props.location.state.InfoClass
        }
    }
    Accion1 = () => {
        if (this.state.Clase.idusuario == UsuarioI[0].id) {
            return (<button className="BClaseAccion">Crear curso</button>)
        }
    }

    render() {
        return (
            <>
                <div id="Main7Container">
                    <div id="ClasesMain7">
                    {Cursos.filter(Esito => Esito.privacidad == this.state.Clase.id).map((Esito, index) => {

                            return (
                                <div id="MaxContC" className="MaxContC" key={index}>
                                    <div className="InfoContMinI2 Ola2____">
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
                    </div>
                    <div id="UsersMain7">
                        {this.Accion1()}
                        <button className="BClaseAccion">Ocultar</button>
                        {Usuarios.map((Esito, index) => {
                            for (let i = 0; i < User_clase.length; i++) {
                                if (Esito.id == User_clase[i].idusuario && User_clase[i].idclase == this.state.Clase.id) {
                                    return (
                                        <div key={index} className="User_card">
                                            <p>{Esito.Nombre + " " + Esito.Apellido}</p>
                                        </div>
                                    );
                                }
                            }
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main7);