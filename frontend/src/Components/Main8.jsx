import React from 'react';
import { withRouter, Link } from 'react-router-dom';
class Main8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    Botones = () => {
        if (this.props.location.state.location == "/misCursos") {
            return (
                <>
                        <Link className="buttonAlgo"  to={{pathname:'/misCursos', state:{location: this.props.location.state.location}}}> 
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                </>
            );
        } else if (this.props.location.state.location == "/Clase") {
            return (
                <>
                        <Link className="buttonAlgo"  to={{pathname:'/clase/'+ this.props.location.state.InfoClass.id, state:{InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location}}}> 
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                </>
            );
        } else {
            return (
                <>
                        <Link className="buttonAlgo"  to={{pathname:'/Integrados', state:{
                            pagina:"Comunidad"
                        }}}> 
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                </>
            );
        }
    }
    Botones2 = () =>{
        if(this.props.location.state.location == '/misCursos'){
            return(
                <Link to={{pathname:"/CrearCursoTeorico", state:{location: this.props.location.state.location}}}>
                <button className="EstiloButtonCrearCursoC">Editar</button>
                </Link>
            );
        }else{
            return(
                <Link to={{pathname:"/CrearCursoTeorico", state:{location: this.props.location.state.location, InfoClass: this.props.location.state.InfoClass}}}>
                <button className="EstiloButtonCrearCursoC">Editar</button>
                </Link>
            );
        }
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
                        {this.Botones()}
                    </div>
                    <div className="CardsCrearContenido">
                        <div className="CardCrearCursoContenido">
                            <h3>Teoría</h3>
                            {this.Botones2()}
                            <button className="EstiloButtonCrearCursoC">Borrar contenido</button>  
                        </div>
                        <div className="CardCrearCursoContenido">
                            <h3>Minijuego</h3>
                            <Link>
                            <button className="EstiloButtonCrearCursoC">Editar</button>
                            </Link>
                            <button className="EstiloButtonCrearCursoC">Borrar contenido</button>
                        </div>
                        <div className="CardCrearCursoContenido">
                            <h3>Examen</h3>
                            <Link>
                            <button className="EstiloButtonCrearCursoC">Editar</button>
                            </Link>
                            <button className="EstiloButtonCrearCursoC">Borrar contenido</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main8);