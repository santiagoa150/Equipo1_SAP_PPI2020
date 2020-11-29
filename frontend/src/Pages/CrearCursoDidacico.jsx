import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import axios from 'axios';
class CrearCursoDidactico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false,
            dataContenidoD: []
        }
    }
    componentDidMount = async () => {
        await this.contenido_d_text();
        if (this.state.dataContenidoD[0]?.contenido_d_text == "") {
            this.setState({ bool: false });
            document.getElementById("SubirBoton").disabled = false;
            document.getElementById("tablero2").style.display = "none";
            document.getElementById("tablero1").style.display = "block";
        } else {
            this.setState({ bool: true });
            document.getElementById("SubirBoton").disabled = true;
            document.getElementById("tablero2").style.display = "block";
            document.getElementById("tablero1").style.display = "none";
        }
    }
    /*Metodo para cambiar a vista previa*/
    changeVistaPrevia = () => {
        this.setState({
            bool: true
        });
        document.getElementById("SubirBoton").disabled = true;
        document.getElementById("tablero2").innerHTML = this.state.ConteCurso;
        document.getElementById("tablero2").style.display = "block";
        document.getElementById("tablero1").style.display = "none";
    }
    /*Metodo para cambiar e editar curso*/
    changeEditarCurso = () => {
        this.setState({ bool: false });
        document.getElementById("SubirBoton").disabled = false;
        document.getElementById("tablero2").style.display = "none";
        document.getElementById("tablero1").style.display = "block";
    }
    /*METODOS QUE RETORNAN BOTONES*/
    returnBotonesSelect = () => {
        if (this.state.bool) {
            return (
                <>
                    <button className="BotonSelectCrearCurso" onClick={() => this.changeEditarCurso()}>Editar</button>
                    <button className="colorcitoReturnSelectCT BotonSelectCrearCurso">Vista previa</button>
                </>
            );
        } else {
            return (
                <>
                    <button className="colorcitoReturnSelectCT BotonSelectCrearCurso">Editar</button>
                    <button className="BotonSelectCrearCurso" onClick={() => this.changeVistaPrevia()}>Vista previa</button>
                </>
            );
        }
    }
    /*Renderizado del botón guardar*/
    Botones = () => {
        let variable = 0;
        if (this.props.location.state.location == "/misCursos") {
            variable = 1;
        } else if (this.props.location.state.location == "/Clase") {
            variable = 2;
        } else {
            variable = 3;
        }
        return (
            <>
                <button className="button buttonMisCursos hoverCreadorT" onClick={() => { this.ActualizacionContenidoT(variable) }}>Guardar</button>
            </>
        );
    }
    /*Renderizado del botón cancelar*/
    Botones2 = () => {
        if (this.props.location.state.location == "/misCursos") {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        } else if (this.props.location.state.location == "/Clase") {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        } else {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { pagina: "Comunidad", idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        }
    }
    /*AXIOS*/
    /*TODOS LOS GETS*/
    /*Este get sirve para traer el contenido_d_text de un curso*/
    contenido_d_text = async () =>{
        await axios.get();
    }
    render() {
        return (
            <>
                <div className="MainCrearCurso">
                    <div className="TableroCrearC">
                        <div className="EditorSelectCrearCT">
                            {this.returnBotonesSelect()}
                        </div>
                        <div className="MainTablero" id="tablero1">

                        </div>
                        <div className="MainTablero" id="tablero2">

                        </div>
                    </div>
                    <div className="InfoCrearC">
                        <img className="LogoCrearCurso" src="https://1.bp.blogspot.com/-4AYfdW1HnGQ/X02wnk_2J_I/AAAAAAAAPPk/znnHlLxw_bINf8jIvcaE3hxEruVJOjcawCLcBGAsYHQ/s16000/Logo.png" />
                        <div className="EditorCrearCurso">
                            <div className="Cien">
                                <p className="Group">Texto:</p>
                                <textarea className="TextAreaCCurso Group" id="TextoCurso" onChange={this.Accion1}></textarea>
                            </div>
                            <div className="Cien Cien2Ele flex-wrap">
                                <button className="hoverCreadorT" id="Negrilla"></button>
                                <button className="hoverCreadorT" id="Cursiva"></button>
                                <button className="hoverCreadorT" id="Titulo"></button>
                                <input className="ButonSubir" type="color" id="colorcitos" />
                                <button className="ButonSubir hoverCreadorT" onClick={this.SubirContenido} id="SubirBoton">Subir</button>
                            </div>
                            <div className="Cien">
                                <p className="Group">Imagenes:</p>
                                <div className="Group divSubImG">
                                    <form id="formProta" encType="multipart/form-data">
                                        <input type="file" accept="image/*" className="SubIMG" id="ImagenesCurso" onChange={this.Accion2} />
                                    </form>
                                    <button className="XImageSubImage hoverCreadorT" onClick={this.Accion3}></button>
                                </div>
                            </div>

                        </div>
                        {this.Botones2()}
                        {this.Botones()}
                    </div>
                    {this.state.boleanosRedirect2.bool3 && <Redirect to={{ pathname: '/CrearCurso', state: { pagina: "Comunidad", idCursoC: this.props.location.state.idCursoC } }} />}
                    {this.state.boleanosRedirect2.bool2 && <Redirect to={{ pathname: '/CrearCurso', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }} />}
                    {this.state.boleanosRedirect2.bool1 && <Redirect to={{ pathname: '/CrearCurso', state: { location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }} />}
                </div>
                <div id="body">

                </div>
            </>
        );
    }
}

export default withRouter(CrearCursoDidactico);