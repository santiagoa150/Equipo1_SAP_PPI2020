import React from 'react';
import { withRouter, Link } from 'react-router-dom';
class Main8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <div className="PadreCursoCrear">
                    
                    <div className="OpcionesCrearCurso editarInfo ">
                    <img className="LogoCrearCurso" src="https://1.bp.blogspot.com/-4AYfdW1HnGQ/X02wnk_2J_I/AAAAAAAAPPk/znnHlLxw_bINf8jIvcaE3hxEruVJOjcawCLcBGAsYHQ/s16000/Logo.png" />
                        <form className="FormCurso">
                            <div className="Cien">
                                <p className="Group ">Título</p>
                                <input type="text" className="Group ICCUrso" />
                            </div>
                            <div className="Cien">
                                <p className="Group">Tematica</p>
                                <input type="text" className="Group ICCUrso" />
                            </div>
                            <div className="Cien">
                                <p className="Group">Materia</p>
                                <input type="text" className="Group ICCUrso" />
                            </div>
                        </form>
                        <button className="button buttonMisCursos">Guardar</button>
                        <button className="button buttonMisCursos">Publicar</button>
                        <Link className="buttonAlgo"  to={{pathname:this.props.location.state.location, state:{InfoClass: this.props.location.state.InfoClass}}}> 
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                    </div>
                    <div>

                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main8);