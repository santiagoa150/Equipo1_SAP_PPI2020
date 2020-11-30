import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
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
            },
            boleanosRedirect2: {
                bool1: false,
                bool2: false,
                bool3: false,
                path: ""
            },
            repintar: false,
            Modal2: {
                return: false,
                numero: 0
            },
            Modal3: {
                return: false
            }, boolFoto: false
        }
    }
    async componentDidMount() {
        await this.getInfoCursoCreados();
    }
    componentDidUpdate(){
        document.getElementById("carga").style.display = "none";
    }
    /*METODOS DE RETORNO DE BOTONES*/
    /*Retorno del boton cancelar*/
    Botones = () => {
        let variable = 0;
        if (this.state.DataInfoCurso2[0]?.titulo == null && this.state.DataInfoCurso2[0]?.tematica == null && this.state.DataInfoCurso2[0]?.materia == null) {
            if (this.props.location.state.location == "/misCursos") {
                variable = 1;
            } else if (this.props.location.state.location == "/Clase") {
                variable = 2;
            } else {
                variable = 3;
            }
            return (
                <>
                    <button className="button buttonMisCursos elefantito" id="ATrasOfF" onClick={() => this.comprobacionCampos(variable, 1, 0)}>Cancelar</button>
                </>
            );
        } else {
            if (this.props.location.state.location == "/misCursos") {
                return (
                    <>
                        <Link className="buttonAlgo" to={{ pathname: '/misCursos', state: { location: this.props.location.state.location } }}>
                            <button className="button buttonMisCursos" id="ATrasOfF">Cancelar</button>
                        </Link>
                    </>
                );
            } else if (this.props.location.state.location == "/Clase") {
                return (
                    <>
                        <Link className="buttonAlgo" to={{ pathname: '/clase', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location } }}>
                            <button className="button buttonMisCursos" id="ATrasOfF">Cancelar</button>
                        </Link>
                    </>
                );
            } else {
                return (
                    <>
                        <Link className="buttonAlgo" to={{
                            pathname: '/Integrados', state: { pagina: "Comunidad" }
                        }}>
                            <button className="button buttonMisCursos" id="ATrasOfF">Cancelar</button>
                        </Link>
                    </>
                );
            }
        }
    }
    /*Retorno del botón editar en curso teorico*/
    Botones2 = (prop, prop2) => {
        let variable = 0;
        if (this.state.DataInfoCurso2[0]?.titulo == null && this.state.DataInfoCurso2[0]?.tematica == null && this.state.DataInfoCurso2[0]?.materia == null) {
            if (this.props.location.state.location == "/misCursos") {
                variable = 1;
            } else if (this.props.location.state.location == "/Clase") {
                variable = 2;
            } else {
                variable = 3;
            }
            return (
                <>
                    <button className="button buttonMisCursos elefantito" id={prop2} onClick={() => this.comprobacionCampos(variable, 2, prop)}>Editar</button>
                </>
            );
        } else {
            if (this.props.location.state.location == "/misCursos") {
                return (
                    <Link to={{ pathname: prop, state: { location: this.props.location.state.location, idCursoC: this.state.DataInfoCurso[0].id } }}>
                        <button className="EstiloButtonCrearCursoC" id={prop2}>Editar</button>
                    </Link>
                );
            } else if (this.props.location.state.location == "/Clase") {
                return (
                    <Link to={{ pathname: prop, state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.state.DataInfoCurso[0].id } }}>
                        <button className="EstiloButtonCrearCursoC" id={prop2}>Editar</button>
                    </Link>
                );
            } else {
                return (
                    <Link to={{ pathname: prop, state: { pagina: "Comunidad", idCursoC: this.state.DataInfoCurso[0].id } }}>
                        <button className="EstiloButtonCrearCursoC" id={prop2}>Editar</button>
                    </Link>
                );
            }
        }
    }
    /*Retorno del botón eliminar curso*/
    DeleteButons = () => {
        let numero = 0;
        if (this.props.location.state.location == "/misCursos") {
            numero = 1;
        } else if (this.props.location.state.location == "/Clase") {
            numero = 2;
        } else {
            numero = 3;
        }
        return (
            <>
                <img src="/Images/Basura.png" onClick={() => this.Modal2(numero)} className="ButtonMetodosCrearC"></img>
            </>
        );
    }
    /*Retorno de la privacidad del curso*/
    privacidadCurso = () => {
        if (this.state.DataInfoCurso[0]?.privacidad == 0) {
            return (
                <>
                    <h2>Público</h2>
                </>
            );
        } else {
            return (
                <>
                    <h2>Privado</h2>
                </>
            );
        }
    }
    /*Retorno de la clase del candado*/
    claseImgCandado = (prop) => {
        if (prop == 0) {
            return ("/Images/CandadoOpen.png");
        } else {
            return ("/Images/CandadoClosed.png")
        }
    }
    /*ACTUALIZACIÓN DE INFORMACIÓN DE UN CURSO*/
    /*Este metodo actualiza la información requerida de un curso*/
    comprobacionCampos = async (numero, prop2, path) => {
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
            await this.putInfoRequerida(form);

            if (prop2 == 1) {
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
            } else {
                if (numero == 1) {
                    this.setState({
                        boleanosRedirect2: {
                            bool1: true,
                            path: path
                        }
                    });
                } else if (numero == 2) {
                    this.setState({
                        boleanosRedirect2: {
                            bool2: true,
                            path: path
                        }
                    });
                } else {
                    this.setState({
                        boleanosRedirect2: {
                            bool3: true,
                            path: path
                        }
                    });
                }
            }
        }
    }
    /*Este metodo sirve para guardar la información de un curso*/
    guardarInfoCurso = async () => {
        let titulo = document.getElementById("Titulo");
        let tematica = document.getElementById("Tematica");
        let materia = document.getElementById("Materia");

        if (titulo.value == "" || tematica.value == "" || materia.value == "") {
            if (titulo.value == "") {
                this.Time(titulo, "text", "Campo sin ingresar");
            } if (tematica.value == "") {
                this.Time(tematica, "text", "Campo sin ingresar");
            } if (materia.value == "") {
                this.Time(materia, "text", "Campo sin ingresar");
            }
        } else if (titulo.value != this.state.DataInfoCurso[0].titulo || tematica.value != this.state.DataInfoCurso[0].tematica || materia.value != this.state.DataInfoCurso[0].materia || this.state.boolFoto) {
            let form = {
                titulo: titulo.value,
                tematica: tematica.value,
                materia: materia.value,
                logo: this.state.DataInfoCurso[0].logo
            }
            await this.putInfoRequerida(form);
            this.setState({
                repintar: !this.state.repintar
            });
            document.getElementById("AlertasCrearCurso").innerHTML = "Cambios guardados";
            document.getElementById("AlertasCrearCursoDiv").style.display = "flex";
            document.getElementById("AlertasCrearCurso").style.color = "#8ac926";
            document.getElementById("EditarButonOff").disabled = true;
            document.getElementById("ATrasOfF").disabled = true;
            document.getElementById("EditarButonOff2").disabled = true;
            document.getElementById("EditarButonOff3").disabled = true;
            setTimeout(function () {
                document.getElementById("AlertasCrearCurso").innerHTML = " ";
                document.getElementById("AlertasCrearCursoDiv").style.display = "none";
                document.getElementById("EditarButonOff").disabled = false;
                document.getElementById("ATrasOfF").disabled = false;
                document.getElementById("EditarButonOff2").disabled = false;
                document.getElementById("EditarButonOff3").disabled = false;
            }, 1500);
        } else {
            document.getElementById("AlertasCrearCurso").innerHTML = "No hay nada para guardar.";
            document.getElementById("AlertasCrearCursoDiv").style.display = "flex";
            document.getElementById("AlertasCrearCurso").style.color = "#ff595e";
            document.getElementById("ATrasOfF").disabled = true;
            document.getElementById("EditarButonOff").disabled = true;
            document.getElementById("EditarButonOff2").disabled = true;
            document.getElementById("EditarButonOff3").disabled = true;
            setTimeout(function () {
                document.getElementById("AlertasCrearCurso").innerHTML = " ";
                document.getElementById("AlertasCrearCursoDiv").style.display = "none";
                document.getElementById("EditarButonOff").disabled = false;
                document.getElementById("ATrasOfF").disabled = false;
                document.getElementById("EditarButonOff2").disabled = false;
                document.getElementById("EditarButonOff3").disabled = false;
            }, 1500);
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
            console.log(Data);
            this.setState({
                DataInfoCurso: Data,
                boolFoto: true
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
    /*MODAL2*/
    /*Esta función activa o desactiva el modal 2*/
    Modal2 = (prop) => {
        this.setState({
            Modal2: {
                return: !this.state.Modal2.return,
                numero: prop
            }
        })
    }
    /*Esta función returna o no el Modal2*/
    Modal2Return = () => {
        if (this.state.Modal2.return) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres eliminar este curso?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => {
                                        this.deleteCurso(this.state.Modal2.numero);
                                        if (this.state.Modal2.numero == 1) {
                                            this.setState({
                                                boleanosRedirect: {
                                                    bool1: true
                                                }, Modal2: {
                                                    numero: 0
                                                }
                                            });
                                        } else if (this.state.Modal2.numero == 2) {
                                            this.setState({
                                                boleanosRedirect: {
                                                    bool2: true
                                                }, Modal2: {
                                                    numero: 0
                                                }
                                            });
                                        } else {
                                            this.setState({
                                                boleanosRedirect: {
                                                    bool3: true
                                                }, Modal2: {
                                                    numero: 0
                                                }
                                            });
                                        }
                                    }}>Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal2(0)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*MODAL3*/
    /*Esta función activa o desactiva el modal 3*/
    Modal3 = () => {
        this.setState({
            Modal3: {
                return: !this.state.Modal3.return
            }
        })
    }
    /*Esta función returna o no el Modal3*/
    Modal3Return = () => {
        if (this.state.Modal3.return) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres borrar el contenido teórico de este curso?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.putSetNullContenidoT(); this.Modal3() }} >Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal3()}>No</button>
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
        console.log("AH BIEN");
        axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.idCursoC}`)
            .then(res => {
                console.log("AH BIEN 2");
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
    /*Este put actualiza la información básica de un curso*/
    putInfoRequerida = (form) => {
        axios.put(`http://localhost:3883/Cur/put_cursos_infoBasica/CrearCurso/${this.state.DataInfoCurso[0].id}`, form)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*Este put actualiza la la privacidad de un curso*/
    putPrivacidad = () => {
        document.getElementById("carga").style.display = "block";
        let titulo = document.getElementById("Titulo");
        let tematica = document.getElementById("Tematica");
        let materia = document.getElementById("Materia");
        let privacidad = 0;
        if (this.state.DataInfoCurso[0].privacidad == 0) {
            privacidad = 1;
        } else {
            privacidad = 0;
        }
        if (titulo.value != "" && tematica.value != "" && materia.value != "") {
            axios.put(`http://localhost:3883/Cur/put_cursos_privacidad/CrearCurso/${this.state.DataInfoCurso[0].id}&${privacidad}`)
                .catch(err => {
                    if (err) {
                        console.error(err);
                    }
                })
        } else {
            if (titulo.value == "") {
                this.Time(titulo, "text", "Campo sin ingresar");
            } if (tematica.value == "") {
                this.Time(tematica, "text", "Campo sin ingresar")
            } if (materia.value == "") {
                this.Time(materia, "text", "Campo sin ingresar")
            }
        }
    }
    /*Este put coloca como null el contenido teorico de el curso que se está editando*/
    putSetNullContenidoT = async () => {
        await axios.put(`http://localhost:3883/Cur/put_cursos_contenido-t_setNull/CrearCurso/${this.state.DataInfoCurso[0].id}`)
            .then(res => {

            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*DELETES*/
    deleteCurso = async (numero) => {
        await axios.delete(`http://localhost:3883/Cur/delete-curso-informacion/paginas/${this.state.DataInfoCurso[0].id}&${UsuarioI[0].id_usuario}`)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })

    }
    render() {
        return (
            <>
                {this.Modal1Return()}
                {this.Modal2Return()}
                {this.Modal3Return()}
                <div className="Cargando" id="carga"></div>
                <div className="PadreCursoCrear">
                    <div className="OpcionesCrearCurso editarInfo">
                        <div className="EncabezadoCrearC">
                            <img className="imagenEditCrearC" id="LogoCursoCrearCursoC" src={this.state.DataInfoCurso[0]?.logo} />
                            <div className="CenterCrearC">
                                {this.privacidadCurso()}
                                <button className="button EstiloButtonCrearCursoC" onClick={() => this.Modal1()}>Cambiar</button>
                            </div>
                        </div>
                        <form className="FormCurso">
                            <div className="Cien">
                                <p className="Group ">Título</p>
                                <input type="text" className="Group ICCUrso" id="Titulo" autoComplete="off" defaultValue={this.state.DataInfoCurso[0]?.titulo} onChange={() => {
                                    let valor = document.getElementById("Titulo");
                                    if (valor.value.length >= 50) {
                                        valor.value = valor.value.substring(0, 49);
                                    }
                                }} />
                            </div>
                            <div className="Cien">
                                <p className="Group">Tematica</p>
                                <input type="text" className="Group ICCUrso" id="Tematica" autoComplete="off" defaultValue={this.state.DataInfoCurso[0]?.tematica} onChange={() => {
                                    let valor = document.getElementById("Tematica");
                                    if (valor.value.length >= 50) {
                                        valor.value = valor.value.substring(0, 49);
                                    }
                                }} />
                            </div>
                            <div className="Cien">
                                <p className="Group">Materia</p>
                                <input type="text" className="Group ICCUrso" id="Materia" autoComplete="off" defaultValue={this.state.DataInfoCurso[0]?.materia} onChange={() => {
                                    let valor = document.getElementById("Materia");
                                    if (valor.value.length >= 50) {
                                        valor.value = valor.value.substring(0, 49);
                                    }
                                }} />
                            </div>
                        </form>
                        <div className="BotonesContaCrearC">
                            {this.DeleteButons()}
                            <img src="/Images/Save.png" onClick={() => this.guardarInfoCurso()} className="ButtonMetodosCrearC"></img>
                            <img src={this.claseImgCandado(this.state.DataInfoCurso[0]?.privacidad)} className="ButtonMetodosCrearC" onClick={() => { this.putPrivacidad(); this.getInfoCursoCreados(); }}></img>
                        </div>
                        <div id="AlertasCrearCursoDiv">
                            <p id="AlertasCrearCurso"></p>
                        </div>
                        {this.Botones()}
                    </div>
                    <div className="CardsCrearContenido">
                        <div className="CardCrearCursoContenido">
                            <h3>Teoría</h3>
                            {this.Botones2("/CrearCursoTeorico", "EditarButonOff")}
                            <button className="EstiloButtonCrearCursoC" onClick={() => { this.Modal3() }}>Borrar contenido</button>
                        </div>
                        <div className="CardCrearCursoContenido">
                            <h3>Minijuego</h3>
                            {this.Botones2("/CrearCursoDidactico", "EditarButonOff2")}
                            <button className="EstiloButtonCrearCursoC">Borrar contenido</button>
                        </div>
                        <div className="CardCrearCursoContenido">
                            <h3>Examen</h3>

                            {this.Botones2("/CrearExamen", "EditarButonOff3")}

                            <button className="EstiloButtonCrearCursoC">Borrar contenido</button>
                        </div>
                    </div>

                </div>
                {this.state.boleanosRedirect2.bool3 && <Redirect to={{ pathname: this.state.boleanosRedirect2.path, state: { pagina: "Comunidad", idCursoC: this.state.DataInfoCurso[0].id } }} />}
                {this.state.boleanosRedirect2.bool2 && <Redirect to={{ pathname: this.state.boleanosRedirect2.path, state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.state.DataInfoCurso[0].id } }} />}
                {this.state.boleanosRedirect2.bool1 && <Redirect to={{ pathname: this.state.boleanosRedirect2.path, state: { location: this.props.location.state.location, idCursoC: this.state.DataInfoCurso[0].id } }} />}
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