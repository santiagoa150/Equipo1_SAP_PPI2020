import React from 'react';
import '../Styles/Main3.css';
import { Cursos } from '../Utiles/Mocks/Cursos';
import { Link } from 'react-router-dom';

class Main3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtrado: Cursos.filter(Esito => Esito.Tipo == "Integrado")
        }
    }
    render() {
        return (
            <>
                <div className="flex">
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
                                                <img className="Edit2" src="/Images/InfoCurso.png" />
                                                <Link to={{pathname:"/Curso", 
                                                state:{
                                                    id: Esito.id
                                                }}}>
                                                    <button className="button buttonI">Iniciar curso</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default Main3;