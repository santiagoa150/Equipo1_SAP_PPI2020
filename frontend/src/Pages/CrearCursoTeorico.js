import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../Styles/CrearCurso.css';
let aja;
class CrearCursoTeorico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ConteCurso: "",
            Bloques: [],
            botones: [false, false, false],
            links:""
        }
    }
    componentDidUpdate(){
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
    Accion2 = async() => {
        let Imagen = document.getElementById("ImagenesCurso");
        if (Imagen.value != "") {
            document.getElementById("TextoCurso").disabled = true;
        } else {
            document.getElementById("TextoCurso").disabled = false;
        }
            this.actualizarimagen();
    }
    /*actualizacion de un link de la imagen*/
    actualizarimagen= ()=>{        
        let Imagen = document.getElementById("ImagenesCurso");
        if (Imagen.files && Imagen.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                aja=e.target.result;
            }
            reader.readAsDataURL(Imagen.files[0]);
        }
    }
    /*Eliminar imagen */
    Accion3 = () => {
        document.getElementById("ImagenesCurso").value = "";
        this.Accion2();
    }
    /*pinta el contenido actual*/
    Pintarvistaprevia() {
        this.state.ConteCurso="";
        this.state.Bloques.map((Esito,Index)=>{
            console.log(Esito);
            let obj=document.getElementById("cont"+Index);
            obj.innerHTML=""+Esito;
            this.state.ConteCurso=this.state.ConteCurso+" "+Esito;
        })
    }
    /*Estado botones*/
    actubotones = (posicion) => {
        let auxiliar=this.state.botones;
        auxiliar[posicion]=!this.state.botones[posicion];
        this.setState({
            botones:auxiliar
        });
    }
    /*Cargar contenido*/
    SubirContenido = () => {
        let Texto = document.getElementById("TextoCurso");
        let color = document.getElementById("colorcitos");
        let cont = "";
        let auxiliar=this.state.Bloques;
        if (Texto.disabled == false) {
            if (Texto.value != "") {
                if(this.state.botones[2]){
                    cont= cont+ "<h2 style='color:"+color.value+";'>";
                }
                else{
                    cont=cont +"<p style='color:"+color.value+";'>";
                }
                if(this.state.botones[1]){
                    cont=cont +"<i>";
                }
                if(this.state.botones[0]){
                    cont=cont +"<b>";
                }
                cont=cont+Texto.value;
                if(this.state.botones[0]){
                    cont=cont +"</b>";
                }
                if(this.state.botones[1]){
                    cont=cont +"</i>";
                }
                if(this.state.botones[2]){
                    cont= cont+ "</h2>";
                }
                else{
                    cont=cont +"</p>";
                }                          
                auxiliar.push(cont);
            }else{
                Texto.value="No hay contenido";
                Texto.style.color="red";
                setTimeout(()=>{
                    Texto.value="";
                    Texto.style.color="black";
                },1500);
            }
        } else {                        
            cont= cont+"<img class='' src='"+ aja +"' />";            
            auxiliar.push(cont);
        }
        document.getElementById("ImagenesCurso").value="";
        Texto.value="";
        color.value="#000000";
        this.setState({
            Bloques:auxiliar
        });        
    }
    /*Renderizado de botones cancelar y guardar*/
    Botones = () => {
        if (this.props.location.state.location == '/misCursos') {
            return (
                <Link className="buttonAlgo" to={{ pathname: "/CrearCurso", state: { location: this.props.location.state.location } }}>
                    <button className="button buttonMisCursos">Guardar</button>
                </Link>
            );
        } else {
            return (
                <Link className="buttonAlgo" to={{ pathname: "/CrearCurso", state: { location: this.props.location.state.location, InfoClass: this.props.location.state.InfoClass } }}>
                    <button className="button buttonMisCursos">Guardar</button>
                </Link>
            );
        }
    }
    /*eliminar bloques creados*/
    eliminarbloque=(x)=>{
        let auxiliar=this.state.Bloques;
        auxiliar.splice(x,x+1);
        this.setState({
            Bloques:auxiliar
        });
    }
    classboton=(posicion)=>{
        if(!this.state.botones[posicion]){
            return("MiniButonCrear");
        }else{
            return("MiniButonCrear1");
        }
    }
    render() {
        return (
            <>
                <div className="MainCrearCurso">
                    <div className="TableroCrearC">
                        <div className="MainTablero">
                            {this.state.Bloques.map((Esito, index) => {
                                return (
                                    <>
                                        <div className="cardcontenido" key={index}>
                                            <div className="contenido" id={"cont"+index}>

                                            </div>
                                            <img src="./images/Basura.png" onClick={()=>{this.eliminarbloque(index)} }/>
                                        </div>
                                    </>
                                );
                            })}
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
                                <button className={this.classboton(0)} id="Negrilla" onClick={() => this.actubotones(0)}></button>
                                <button className={this.classboton(1)} id="Cursiva" onClick={() => this.actubotones(1)}></button>
                                <button className={this.classboton(2)} id="Titulo" onClick={() => this.actubotones(2)}></button>
                                <input className="ButonSubir" type="color" id="colorcitos"/>
                                <button className="ButonSubir" onClick={this.SubirContenido}>Subir</button>
                            </div>
                            <div className="Cien">
                                <p className="Group">Imagenes:</p>
                                <div className="Group divSubImG">
                                    <form id="formProta" encType="multipart/form-data">
                                        <input type="file" accept="image/*" className="SubIMG" id="ImagenesCurso" onChange={this.Accion2} />
                                    </form>
                                    <button className="XImageSubImage" onClick={this.Accion3}></button>
                                </div>
                            </div>

                        </div>
                        <button className="button buttonMisCursos">Cancelar</button>
                        {this.Botones()}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(CrearCursoTeorico);