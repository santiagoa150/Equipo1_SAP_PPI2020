import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../Styles/CrearCurso.css';
class CrearCursoTeorico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ConteCurso: ""
        }
    }
    Botones = () => {
        if (this.props.location.state.location == "/misCursos") {
            return (
                <>
                    <Link className="ButtonCCurso2" to="/misCursos">
                        <button className="ButtonCCurso">Atrás</button>
                    </Link>
                    <Link className="ButtonCCurso2" to="/misCursos">
                        <button className="ButtonCCurso">Guardar</button>
                    </Link>
                </>
            );
        } else {
            return (
                <>
                    <Link className="ButtonCCurso2" to={{ pathname: "/clase/" + this.props.location.state.InfoClass.id, state: { InfoClass: this.props.location.state.InfoClass } }}>
                        <button className="ButtonCCurso">Atrás</button>
                    </Link>
                    <Link className="ButtonCCurso2" to={{ pathname: "/clase/" + this.props.location.state.InfoClass.id, state: { InfoClass: this.props.location.state.InfoClass } }}>
                        <button className="ButtonCCurso">Guardar</button>
                    </Link>
                </>
            );
        }
    }
    Accion1 = () => {
        let Texto = document.getElementById("TextoCurso");
        if (Texto.value != "") {
            document.getElementById("ImagenesCurso").disabled = true;
        } else {
            document.getElementById("ImagenesCurso").disabled = false;
        }
    }
    Accion2 = () => {
        let Imagen = document.getElementById("ImagenesCurso");
        if (Imagen.value != "") {
            document.getElementById("TextoCurso").disabled = true;
        } else {
            document.getElementById("TextoCurso").disabled = false;
        }
    }
    Accion3 = () =>{
        document.getElementById("ImagenesCurso").value = "";
    }
    SubirContenido = () =>{
        let Texto = document.getElementById("TextoCurso");
        let Imagen = document.getElementById("ImagenesCurso");

        if(Texto.disabled == false){
            if(Texto.value != ""){

            }
        } else {

        }
    }
    render() {
        return (
            <>
                <div className="MainCrearCurso">
                    <div className="TableroCrearC">
                        <div className="MainTablero">

                        </div>
                    </div>
                    <div className="InfoCrearC">
                        <img className="LogoCrearCurso" src="https://1.bp.blogspot.com/-4AYfdW1HnGQ/X02wnk_2J_I/AAAAAAAAPPk/znnHlLxw_bINf8jIvcaE3hxEruVJOjcawCLcBGAsYHQ/s16000/Logo.png" />
                        
                        <div className="EditorCrearCurso">
                            <div className="Cien">
                                <p className="Group">Texto:</p>
                                <textarea className="TextAreaCCurso Group" id="TextoCurso" onChange={this.Accion1}></textarea>
                            </div>
                            <div className="Cien Cien2Ele">
                                <button className="MiniButonCrear" id="Negrilla"></button>
                                <button className="MiniButonCrear" id="Cursiva"></button>
                                <button className="MiniButonCrear" id="Titulo"></button>
                                <button className="ButonSubir" onClick={this.SubirContenido}>Subir</button>
                            </div>
                            <div className="Cien">
                                <p className="Group">Imagenes:</p>
                                <div className="Group divSubImG">
                                    <input type="file" className="SubIMG" id="ImagenesCurso" onChange={this.Accion2} />
                                    <button className="XImageSubImage" onClick={this.Accion3}></button>
                                </div>
                            </div>

                        </div>
                        {this.Botones()}

                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(CrearCursoTeorico);