import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
let aja2;
class Main8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataInfoCurso: [],
            DataInfoCurso2: [],
            Modal1: false,
            boleanosRedirect: {
                bool1: false,
                bool2: false,
                bool3: false
            }
        }
    }
    async componentDidMount() {
        await this.getInfoCursoCreados();
    }
    /*METODOS DE RETORNO DE BOTONES*/
    /*Retorno del boton cancelar*/
    Botones = () => {
        if (this.state.DataInfoCurso2[0]?.titulo == null && this.state.DataInfoCurso2[0]?.tematica == null && this.state.DataInfoCurso2[0]?.materia == null) {
            if (this.props.location.state.location == "/misCursos") {
                return (
                    <>
                        <button className="button buttonMisCursos" onClick={() => this.comprobacionCampos(1)}>Cancelar</button>
                    </>
                );
            } else if (this.props.location.state.location == "/Clase") {
                return (
                    <>
                        <button className="button buttonMisCursos" onClick={() => this.comprobacionCampos(2)}>Cancelar</button>
                    </>
                );
            } else {
                return (
                    <>
                        <button className="button buttonMisCursos" onClick={() => this.comprobacionCampos(3)}>Cancelar</button>
                    </>
                );
            }
        } else {
            if (this.props.location.state.location == "/misCursos") {
                return (
                    <>
                        <Link className="buttonAlgo" to={{ pathname: '/misCursos', state: { location: this.props.location.state.location } }}>
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                    </>
                );
            } else if (this.props.location.state.location == "/Clase") {
                return (
                    <>
                        <Link className="buttonAlgo" to={{ pathname: '/clase', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location } }}>
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                    </>
                );
            } else {
                return (
                    <>
                        <Link className="buttonAlgo" to={{
                            pathname: '/Integrados', state: { pagina: "Comunidad" }
                        }}>
                            <button className="button buttonMisCursos">Cancelar</button>
                        </Link>
                    </>
                );
            }
        }
    }
    Botones2 = () => {
        if (this.props.location.state.location == '/misCursos') {
            return (
                <Link to={{ pathname: "/CrearCursoTeorico", state: { location: this.props.location.state.location } }}>
                    <button className="EstiloButtonCrearCursoC">Editar</button>
                </Link>
            );
        } else {
            return (
                <Link to={{ pathname: "/CrearCursoTeorico", state: { location: this.props.location.state.location, InfoClass: this.props.location.state.InfoClass } }}>
                    <button className="EstiloButtonCrearCursoC">Editar</button>
                </Link>
            );
        }
    }
    /*ACTUALIZACIÓN DE INFORMACIÓN DE UN CURSO*/
    /*Este metodo actualiza la información requerida de un curso*/
    comprobacionCampos = async (numero) => {
        let titulo = document.getElementById("Titulo");
        let tematica = document.getElementById("Tematica");
        let materia = document.getElementById("Materia");

        if (titulo.value == "" && tematica.value == "" && materia.value == "") {
            if (titulo.value == "") {
                this.Time(titulo, "text", "Campo sin ingresar");
            } if (tematica.value == "") {
                this.Time(tematica, "text", "Campo sin ingresar")
            } if (materia.value == "") {
                this.Time(materia, "text", "Campo sin ingresar")
            }
        } else {
            let form = {
                titulo: titulo.value,
                tematica: tematica.value,
                materia: materia.value,
                logo: this.state.DataInfoCurso[0].logo
            }
            await this.putInfoRequerida(numero, form);
            
            console.log("hola");
            if (numero == 1) {
                this.setState({
                    boleanosRedirect: {
                        bool1: true
                    }
                });
            } else if (numero == 2) {
                this.setState({
                    boleanosRedirect: {
                        bool2: true
                    }
                });
            } else {
                this.setState({
                    boleanosRedirect: {
                        bool3: true
                    }
                });
            }
        }
    }
    /*TIMER*/
    Time = (Propi, Propi2, Propi3) => {
        Propi.type = "text";
        Propi.style.color = "red";
        Propi.style.border = "2px solid #ff595e";
        Propi.value = Propi3;
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.style.border = "1px solid black";
            Propi.value = "";
        }, 1500)
    }
    /*ACTUALIZAR LOGO DE UN CURSO*/
    /*Esta función realiza la vista previa del logo del curso*/
    Subir = () => {
        let inpu = document.getElementById("Elprota");
        if (inpu.files && inpu.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                aja2 = e.target.result;
                document.getElementById("body2").innerHTML = "<canvas id='tempCanvas' width='500' height='500' style='display:none'/>";
                var canvas = document.getElementById("tempCanvas");
                var ctx = canvas.getContext("2d");
                var cw = canvas.width;
                var ch = canvas.height;
                var maxW = 500;
                var maxH = 500;
                var img = new Image;
                img.src = this.result;
                img.onload = function () {
                    var iw = img.width;
                    var ih = img.height;
                    if (iw > 300 || ih > 300) {
                        var scale = Math.min((maxW / iw), (maxH / ih));
                        var iwScaled = iw * scale;
                        var ihScaled = ih * scale;
                        canvas.width = iwScaled;
                        canvas.height = ihScaled;
                        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
                        aja2 = canvas.toDataURL("image/jpeg");
                        document.getElementById("tempCanvas").remove();
                    }
                }
                document.getElementById("PrevImg").src = aja2;
            }
            reader.readAsDataURL(inpu.files[0]);
        }
    }
    /*Esta funcion actualiza el logo de un curso creado*/
    Subir2 = async () => {
        let inpu = document.getElementById("Elprota");
        if (inpu.files && inpu.files[0]) {
            document.getElementById("LogoCursoCrearCursoC").src = aja2;
            let Data = this.state.DataInfoCurso;
            Data[0].logo = aja2;
            this.setState({
                DataInfoCurso: Data
            });
        }
    }
    /*MODAL1*/
    /*Esta función activa o desactiva el modal*/
    Modal1 = () => {
        this.setState({ Modal1: !this.state.Modal1 })
    }
    /*Esta función returna o no el Modal1*/
    Modal1Return = () => {
        if (this.state.Modal1) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp">
                            <div className="TitleModal1Perfíl2">
                                <h2>Cambia el logo del curso</h2>
                            </div>
                            <div className="MainModal1Perfíl">
                                <form id="formProta" encType="multipart/form-data">
                                    <input id="Elprota" accept="image/*" onChange={this.Subir} type="file" />
                                </form>
                                <img id="PrevImg" className="PrevImg2" />
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.Subir2(); this.Modal1() }}>Subir</button>
                                    <button className="button SubImg2" onClick={this.Modal1}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Traer la información del curso que se está creando o editando*/
    getInfoCursoCreados = async () => {
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.idCursoC}`)
            .then(res => {
                this.setState({
                    DataInfoCurso: res.data,
                    DataInfoCurso2: res.data
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*PUTS*/
    putInfoRequerida = (numero, form) => {
         axios.put(`http://localhost:3883/Cur/put_cursos_infoBasica/CrearCurso/${this.state.DataInfoCurso[0].id}`, form)
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
                {this.Modal1Return()}
                <div className="PadreCursoCrear">
                    <div className="OpcionesCrearCurso editarInfo">
                        <div className="EncabezadoCrearC">
                            <img className="imagenEditCrearC" id="LogoCursoCrearCursoC" src={this.state.DataInfoCurso[0]?.logo} />
                            <div >
                                <button className="button EstiloButtonCrearCursoC" onClick={() => this.Modal1()}>Cambiar</button>
                            </div>
                        </div>
                        <form className="FormCurso">
                            <div className="Cien">
                                <p className="Group ">Título</p>
                                <input type="text" className="Group ICCUrso" id="Titulo" value={this.state.DataInfoCurso[0]?.titulo} />
                            </div>
                            <div className="Cien">
                                <p className="Group">Tematica</p>
                                <input type="text" className="Group ICCUrso" id="Tematica" value={this.state.DataInfoCurso[0]?.tematica} />
                            </div>
                            <div className="Cien">
                                <p className="Group">Materia</p>
                                <input type="text" className="Group ICCUrso" id="Materia" value={this.state.DataInfoCurso[0]?.materia} />
                            </div>
                        </form>
                        <div className="BotonesContaCrearC">
                            <img src="/Images/Basura.png" className="ButtonMetodosCrearC"></img>
                            <img src="/Images/Save.png" className="ButtonMetodosCrearC"></img>
                            <img src="/Images/Publicar.png" className="ButtonMetodosCrearC"></img>
                        </div>
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
                {this.state.boleanosRedirect.bool1 && <Redirect to={{ pathname: '/misCursos', state: { location: this.props.location.state.location } }} />}
                {this.state.boleanosRedirect.bool2 && <Redirect to={{ pathname: '/clase', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location } }} />}
                {this.state.boleanosRedirect.bool3 && <Redirect to={{
                    pathname: '/Integrados', state: { pagina: "Comunidad" }
                }} />}
                <div id="body2">

                </div>
            </>
        );
    }
}

export default withRouter(Main8);