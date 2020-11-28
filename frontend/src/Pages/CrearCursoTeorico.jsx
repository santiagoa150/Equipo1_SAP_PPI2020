import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../Styles/CrearCurso.css';
let aja;
class CrearCursoTeorico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ConteCurso: "",
            Bloques: [],
            botones: [false, false, false],
            links: "",
            bool: false,
            dataContenidoT: [],
            boleanosRedirect2: {
                bool1: false,
                bool2: false,
                bool3: false
            }, creando: true,
            anexando: false,
            index: 0
        }
    }
    async componentDidMount() {
        await this.getContenidoT();
        if (this.state.dataContenidoT[0]?.contenido_t == null) {
            this.setState({ bool: false });
            document.getElementById("SubirBoton").disabled = false;
            document.getElementById("tablero2").style.display = "none";
            document.getElementById("tablero1").style.display = "block";
        } else {
            this.setState({ bool: true });
            document.getElementById("tablero2").innerHTML = this.state.dataContenidoT[0].contenido_t;
            document.getElementById("SubirBoton").disabled = true;
            document.getElementById("tablero2").style.display = "block";
            document.getElementById("tablero1").style.display = "none";
        }
        console.log(this.state.dataContenidoT[0]?.contenido_t);
        if (this.state.dataContenidoT[0]?.contenido_t != "") {
            this.setState({ Bloques: this.state.dataContenidoT[0].contenido_t?.split("<!--->") });
        } 
        
    }
    componentDidUpdate() {
        this.Pintarvistaprevia();
    }
    /* Deshabilitar imagen */
    Accion1 = () => {
        let Texto = document.getElementById("TextoCurso");
        if (Texto.value != "") {
            document.getElementById("ImagenesCurso").disabled = true;
        } else {
            document.getElementById("ImagenesCurso").disabled = false;
        }
    }
    /* Deshabilitar texto */
    Accion2 = async () => {
        let Imagen = document.getElementById("ImagenesCurso");
        if (Imagen.value != "") {
            document.getElementById("TextoCurso").disabled = true;
        } else {
            document.getElementById("TextoCurso").disabled = false;
        }
        this.actualizarimagen();
    }
    /*actualizacion de un link de la imagen*/
    actualizarimagen = () => {
        let Imagen = document.getElementById("ImagenesCurso");
        if (Imagen.files && Imagen.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                aja = e.target.result;
                document.getElementById("body").innerHTML = "<canvas id='tempCanvas' width='300' height='300' style='display:none'></canvas>";
                var canvas = document.getElementById("tempCanvas");
                var ctx = canvas.getContext("2d");
                var cw = canvas.width;
                var ch = canvas.height;
                var maxW = 300;
                var maxH = 300;
                var img = new Image;
                img.src = this.result;
                img.onload = function () {
                    var iw = img.width;
                    var ih = img.height;
                    if (ih > 300 || iw > 300) {
                        var scale = Math.min((maxW / iw), (maxH / ih));
                        var iwScaled = iw * scale;
                        var ihScaled = ih * scale;
                        canvas.width = iwScaled;
                        canvas.height = ihScaled;
                        ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
                        aja = canvas.toDataURL("image/jpeg");
                        console.log(canvas.toDataURL("image/jpeg"));
                        document.getElementById("tempCanvas").remove();
                    }
                }
            }
            reader.readAsDataURL(Imagen.files[0]);
        }
    }
    /*Eliminar imagen */
    Accion3 = () => {
        document.getElementById("ImagenesCurso").value = "";
        this.Accion2();
    }
    /*Actualiza el valor del estado ConteCurso ==> La vista previa del curso*/
    Pintarvistaprevia() {
        this.state.ConteCurso = "";
        this.state.Bloques.map((Esito, Index) => {
            let obj = document.getElementById("cont" + Index);
            obj.innerHTML = "" + Esito;
            if (this.state.ConteCurso == "") {

                this.state.ConteCurso = Esito;
            } else {
                this.state.ConteCurso = this.state.ConteCurso + "<!--->" + Esito;
            }
        })
    }
    classboton = (posicion) => {
        if (!this.state.botones[posicion]) {
            return ("MiniButonCrear");
        } else {
            return ("MiniButonCrear1");
        }
    }
    /*METODOS QUE RETORNAN BOTONES*/
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
    /*Renderizado lapicito*/
    lapiz = (index) => {
        if (this.state.Bloques[index].substr(0, 52) != "<div class='centerIMG'><img  class='centerImg' src='") {
            return (<img src="./images/Lapiz.png" onClick={() => { this.editarBloque(index) }} className="basuraCrearCT" />);
        }
    }
    /*Renderizado de los objetos del más*/
    renderContentMas = (index) => {
        if ((index + 1) < this.state.Bloques.length) {
            return (
                <>
                    <div className='elHueco' id={"elHueco" + (index + 1)}><p>Estás editando aquí.</p><img className="CancelarElHueco" src="/Images/Cancelar.png" onClick={()=> {this.setState({
                        creando: true, anexando: false
                    }); document.getElementById("elHueco" + (index + 1)).style.display="none";
                    document.getElementById("rayita" + (index+1)).style.display ="block"; document.getElementById("mas" + (index+1)).style.display ="block";}}></img></div>
                    <div className="RayaCrearContenidoT" id={"rayita" + (index + 1)}></div>
                    <img className="MasCrearContenidoT" id={"mas" + (index + 1)} src="/Images/Mas2.png" onClick={() => { this.hueco(index + 1) }} />
                </>
            )
        }
    }
    /*ESTOS METODOS SE UTILIZAN EN LA CREACIÓN Y EDICIÓN DEL CONTENIDO TEORÍCO*/
    /*Este metodo elimina un bloque de cotenido*/
    eliminarbloque = (x) => {
        let auxiliar = this.state.Bloques;
        auxiliar.splice(x, 1);
        this.setState({
            Bloques: auxiliar
        });
    }
    /*Este metodo sirve para editar un bloque insertado*/
    editarBloque = (x) => {
        this.state.index = x;
        this.state.creando = false;
        this.state.anexando = false;
        /*52*/
        document.getElementById("TextoCurso").value = document.getElementById("cont" + x).textContent;
    }
    /*Este metodo sube el contenido teorico a los bloques del editor*/
    SubirContenido = () => {
        document.getElementById("Negrilla").style.backgroundColor = "#FFFFFF";
        document.getElementById("Cursiva").style.backgroundColor = "#FFFFFF";
        document.getElementById("Titulo").style.backgroundColor = "#FFFFFF";
        let Texto = document.getElementById("TextoCurso");
        let color = document.getElementById("colorcitos");
        let cont = "";
        let auxiliar = this.state.Bloques;
        if (Texto.disabled == false) {
            if (Texto.value != "") {
                if (this.state.botones[2]) {
                    cont = cont + "<div><h2 style='color:" + color.value + ";'>";
                }
                else {
                    cont = cont + "<div><p style='color:" + color.value + ";'>";
                }
                if (this.state.botones[1]) {
                    cont = cont + "<u>";
                }
                if (this.state.botones[0]) {
                    cont = cont + "<i>";
                }
                cont = cont + Texto.value;
                if (this.state.botones[0]) {
                    cont = cont + "</i>";
                }
                if (this.state.botones[1]) {
                    cont = cont + "</u>";
                }
                if (this.state.botones[2]) {
                    cont = cont + "</h2></div>";
                }
                else {
                    cont = cont + "</p></div>";
                }
                if (this.state.creando) {
                    auxiliar.push(cont);
                } else if (this.state.anexando) {
                    let copia = auxiliar.splice(this.state.index, (auxiliar.length - this.state.index));
                    auxiliar.push(cont);
                    for (let i = 0; i < copia.length; i++) {
                        auxiliar.push(copia[i]);
                    }

                    document.getElementById("elHueco" + this.state.index).style.display = "none";
                    document.getElementById("rayita" + this.state.index).style.display = "block";
                    document.getElementById("mas" + this.state.index).style.display = "block";
                } else {
                    auxiliar[this.state.index] = cont;
                }
            } else {
                Texto.value = "No hay contenido";
                Texto.style.color = "red";
                setTimeout(() => {
                    Texto.value = "";
                    Texto.style.color = "black";
                }, 1500);
            }
        } else {
            cont = cont + "<div class='centerIMG'><img  class='centerImg' src='" + aja + "' /></div>";
            if (this.state.creando) {
                auxiliar.push(cont);
            } else if (this.state.anexando) {
                let copia = auxiliar.splice(this.state.index, (auxiliar.length - this.state.index));
                auxiliar.push(cont);
                for (let i = 0; i < copia.length; i++) {
                    auxiliar.push(copia[i]);
                }
                document.getElementById("elHueco" + this.state.index).style.display = "none";
                document.getElementById("rayita" + this.state.index).style.display = "block";
                document.getElementById("mas" + this.state.index).style.display = "block";
            } else {
                auxiliar[this.state.index] = cont;
            }
        }
        document.getElementById("ImagenesCurso").value = "";
        document.getElementById("ImagenesCurso").disabled = false;
        document.getElementById("TextoCurso").disabled = false;
        Texto.value = "";
        color.value = "#000000";
        this.setState({
            Bloques: auxiliar,
            botones: [false, false, false],
            creando: true,
            anexando: false
        });
    }
    /*Este metodo actualiza el contenido teoríco del curso en la database*/
    ActualizacionContenidoT = async (numero) => {
        await this.putContenidoT();

        if (numero == 1) {
            this.setState({
                boleanosRedirect2: {
                    bool1: true
                }
            });
        } else if (numero == 2) {
            this.setState({
                boleanosRedirect2: {
                    bool2: true
                }
            });
        } else {
            this.setState({
                boleanosRedirect2: {
                    bool3: true
                }
            });
        }
    }
    /*Metodo para utilizar las tres microfunciones de la negrilla, cursiva y titulo*/
    actubotones = (posicion, id) => {
        let auxiliar = this.state.botones;
        document.getElementById(id).style.backgroundColor = "#ffca3a";
        auxiliar[posicion] = !this.state.botones[posicion];
        this.setState({
            botones: auxiliar
        });
    }
    hueco = (prop) => {
        /**/
        document.getElementById("elHueco" + prop).style.display = "flex";
        document.getElementById("rayita" + prop).style.display = "none";
        document.getElementById("mas" + prop).style.display = "none";
        this.state.anexando = true;
        this.state.creando = false;
        this.state.index = prop;
    }
    /*ESTOS METODOS SE UTILIZAN PARA MOSTRAR LA VISTA PREVIA O EL EDITOR DE TEXTO*/
    /*Metodo que retorna los botones de editar y vista previa en el doom*/
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
    /*AXIOS*/
    /*GETS*/
    /*Este metodo trae el contenido teoríco del curso que se está edianto*/
    getContenidoT = async () => {
        await axios.get(`http://localhost:3883/Cur/get_cursos_id-ContenidoT/crearContenidoTeorico/${this.props.location.state.idCursoC}`)
            .then(res => {
                this.setState({
                    dataContenidoT: res.data
                });
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*PUTS*/
    /*Este metodo actualiza el contenido teoríco del curso que se está editando*/
    putContenidoT = () => {
        let form = {
            contenido_t: this.state.ConteCurso
        }
        axios.put(`http://localhost:3883/Cur/put_cursos_contenido-t/CrearCursoTeorico/${this.props.location.state.idCursoC}`, form)
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
                <div className="MainCrearCurso">
                    <div className="TableroCrearC">
                        <div className="EditorSelectCrearCT">
                            {this.returnBotonesSelect()}
                        </div>
                        <div className="MainTablero" id="tablero1">
                            {this.state.Bloques.map((Esito, index) => {
                                return (
                                    <>
                                        <div className="cardcontenidoTeorico" key={index}>
                                            <div className="contenido" id={"cont" + index}>
                                            </div>
                                            <div className="basuraCrearCTContainer">
                                                {this.lapiz(index)}
                                                <img src="./images/Basura.png" className="basuraCrearCT" onClick={() => { this.eliminarbloque(index) }} />
                                            </div>
                                        </div>
                                        <div className="MasCrearContenidoT2" id={"hueco" + (index+1)}>
                                            {this.renderContentMas(index)}
                                        </div>
                                    </>
                                );
                            })}
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
                                <button className={this.classboton(0) + " hoverCreadorT"} id="Negrilla" onClick={() => this.actubotones(0, "Negrilla")} ></button>
                                <button className={this.classboton(1) + " hoverCreadorT"} id="Cursiva" onClick={() => this.actubotones(1, "Cursiva")}></button>
                                <button className={this.classboton(2) + " hoverCreadorT"} id="Titulo" onClick={() => this.actubotones(2, "Titulo")}></button>
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

export default withRouter(CrearCursoTeorico);