import React from 'react';
import '../Styles/Main3.css';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
class Main3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtrado: [],
            filtrar: [],
            posicion: 0,
            tamaño: 0,
            array: [],
            actual: [],
            despaginar: 0,
            IniciarCursoPost:{
                booleano: false,
                idEnviar: 0
            },
            dataCursosI: [],
            form:{
                id_usuario: UsuarioI[0].id_usuario
            },
            modal1:{
                modal1bool: false,
                modal1title: "",
                modal1Id: 0,
                modalValoracion: 0,
                modalCantVotantes: 0
            },
            form2:{
                valoracion: 0,
                cant_votantes: 0
            }
            
        }
    }
    componentDidMount = () => {
        this.getCursos();
        this.getCursoIniciado();
    }
    /*MODAL1*/
    /*Determina si el modal 1 se pinta o no*/
    modal1 =(prop, prop2, prop3, prop4) =>{     
        let Data = this.state.dataCursosI.filter(filter => filter.id_curso == prop && filter.id_usuario == UsuarioI[0].id_usuario && filter.valoracion_curso == 0)
        if(Data.length != 0){       
        this.setState({modal1: {
            modal1bool: !this.state.modal1.modal1bool,
            modal1title: prop2,
            modal1Id: prop,
            modalValoracion: prop3,
            modalCantVotantes: prop4
        }});
        
        }
    }
    /*Retorna el modal 1*/
    modal1Return = () =>{
        if(this.state.modal1.modal1bool){
            return(
                <>
                    <div className="ModalFondo">
                        <div className="Modal1">
                            <div className="ModalTitle">
                                <h2>Valora el curso {this.state.modal1.modal1title}</h2>
                            </div>
                            <div className="RangeNumber">
                                <input type="range"step="0.1" className="slider" id="num" min="1" max="5" defaultValue="1" onInput={() => this.cos1()}/>
                                <input type="text"  disabled  className="numberModal1" id="con1" value="1"/>
                            </div>
                            <button className="button buttonModal1" onClick={() => {this.putCalificacionCurso(this.state.modal1.modal1Id); this.putCalificacionCurso2(this.state.modal1.modal1Id, this.state.modal1.modalValoracion, this.state.modal1.modalCantVotantes)}}>Calificar</button>
                            <button className="button buttonModal1" onClick={() => {this.setState({
                                modal1:{
                                    modal1bool: !this.state.modal1.modal1bool
                                }
                            }); this.modal1Return()}}>Cancelar</button>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*SLIDER*/
    cos1 = () =>{
        document.getElementById("con1").value = document.getElementById("num").value;
                let slider = document.getElementById("num");
                let x = slider.value;
                console.log(slider.value);
                let color = 'linear-gradient(90deg, rgb(239, 202, 8)' + ((x-1) * 25)+ '%, rgb(214,214,214)' + ((x-1) * 25) + '%)';
                document.getElementById("num").style.background = color;
    }
    /*METODOS DE PAGINACIÓN Y FILTRADO*/
    /*Este metodo realiza la paginación y el filtrado de los cursos*/
    filtrando = () => {
            let filtrado;
            let tamaño;
            let filtro = document.getElementById("filt").value;
            let tam = 4;
            if (filtro == "") {
                let x = Math.ceil(this.state.filtrar.length / tam);
                filtrado = this.state.filtrar.reverse();
                tamaño = x;
    
            } else {
                let arrays1 = this.state.filtrar.filter(Esito => Esito.usuario?.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.materia.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.tematica.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()));
                let x = Math.ceil(arrays1.length / tam);
                filtrado = arrays1.reverse();
                tamaño = x;
            }
    
    
            let cont = 0;
            let arrays = [];
            for (let i = 0; i < tamaño; i++) {
                let array2 = [];
                for (let j = 0; j < tam && cont < filtrado.length; j++) {
                    array2.push(filtrado[cont]);
                    cont++;
                }
                arrays.push(array2);
            }
            if (arrays[0]) {
                this.setState({
                    filtrado: filtrado,
                    tamaño: tamaño,
                    array: arrays,
                    actual: arrays[this.state.posicion]
                });
            } else {
                this.setState({
                    filtrado: filtrado,
                    tamaño: tamaño,
                    array: arrays,
                    actual: []
                });
            }
    }
    /*Determina renderizado de la flecha a la izquierda*/
    flech = () => {
        if (this.state.despaginar == 0) {
            this.state.despaginar = 1;
        }
        if (this.state.despaginar == this.state.tamaño - 1) {
            this.state.despaginar = this.state.tamaño - 2;
        }
        if (this.state.despaginar != 1 && this.state.tamaño > 3) {
            return (
                <input className="botonescamb" type="button" value="◄" onClick={() => {
                    this.setState({
                        despaginar: this.state.despaginar - 1
                    });
                }} />
            );
        }
    }
    /*Determina renderizado de la flecha a la derecha*/
    flech2 = () => {

        if (this.state.despaginar != this.state.tamaño - 2 && this.state.tamaño > 3) {
            return (
                <input className="botonescamb" type="button" value="►" onClick={() => {
                    this.setState({
                        despaginar: this.state.despaginar + 1
                    });
                }} />
            );
        }

    }
    /*Metodo que determina el final de la paginación*/
    final = () => {
        if (this.state.posicion >= this.state.tamaño - 1) {
            return (<div><p>No hay mas cursos para mostrar</p></div>);
        }
    }
    /*METODOS QUE SE EJECUTAN EN EL RENDER*/
    /*Metodo que se ejecuta en el render que retorna la valoración de un curso*/
    colorcito = (prop, prop2) => {
        let propcito = (Math.round(prop * 10)) /10;
        
        if (prop2 == 0) {
            return (<p className="gridComunidadVal blancoText">{propcito}</p>)
        } else {
            if (propcito < 3) {
                return (<p className="gridComunidadVal redText">{propcito}</p>)
            } else if (propcito< 4) {
                return (<p className="gridComunidadVal orangeText">{propcito}</p>)
            } else if (propcito< 4.5) {
                return (<p className="gridComunidadVal yellowText">{propcito}</p>)
            } else {
                return (<p className="gridComunidadVal greenText">{propcito}</p>)
            }
        }
    }
    /*Metodo que se ejecuta en el render que retorna un botón que realiza un POST o no - POS INICIAR CURSO*/
    IniciarCurso = (prop, prop2) => {
        let Data = this.state.dataCursosI.filter(filtro => filtro.id_usuario == UsuarioI[0].id_usuario && filtro.id_curso == prop);
        if (Data.length != 0 || prop2 == UsuarioI[0].id_usuario) {
            return (
                <Link to={{
                    pathname: "/Curso",
                    state: {
                        id: prop,
                        pagina: this.props.location
                    }
                }}>
                    <button className="button buttonI">Iniciar curso</button>
                </Link>
            );
        }else{
            return (
                    <button className="button buttonI" onClick={() => this.postIniciarCurso(prop)}>Iniciar curso</button>
                    );
        }
    }
    /*Metodo que se ejecuta en el render que retorna la estrella o la medalla, o lapiz en la card de un curso.*/
    Accion1 = (prop, prop2, prop3, prop4, prop5) => {
        
        let Data;
        if (prop == UsuarioI[0].id_usuario) {
            return (
                <>
                    <Link to={{ pathname: "/CrearCurso", state: { location: "/Integrados", idCursoC: prop2 } }}>
                        <img className="Edit2" src="/Images/Lapiz.png" />
                    </Link>
                </>
            );
        } else {
            Data = this.state.dataCursosI.filter(filtro => filtro.id_curso == prop2&& filtro.valoracion_curso != 0);
            if(Data.length == 0){  
            return (
                <>
                    <img className="Edit2" src="/Images/Star.png" onClick={()=> this.modal1(prop2,prop3, prop4,prop5)}/>
                </>
            );
            }else{ 
                return (
                    <>
                        <img className="Edit2 cursorNone" src="/Images/Medalla.png" />
                    </>
                );
            }
        }
        
    }
    /*AXIOS*/
    /*GETS*/
    /*Este get trae todos los cursos dependiendo si la pagina es comunidad o integrado*/
    getCursos = async () =>{
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/${this.props.location.state.pagina}`)
            .then(res => {
                this.setState({ filtrar: res.data });
                this.filtrando();
            }).catch(err => {
                console.error(err);
            }); 
    }
    /*Este get trae todos los cursos iniciados*/
    getCursoIniciado = async ()=>{
        console.log("hola");
         axios.get(`http://localhost:3883/UsuCur/traer-UsuarioCalificacion/Integrado-Comunidad/${UsuarioI[0].id_usuario}`)
        .then(res => {
            this.setState({dataCursosI: res.data});
        }).catch(err => {
            console.error(err);
        })
    }
    /*POST*/
    /*Este post inicia un curso actualizando la tabla Usuario-calificacion */
    postIniciarCurso = async (prop) =>{
        await axios.post(`http://localhost:3883/UsuCur/user-init-curso/${prop}`, this.state.form)
            .then(response =>{
                console.log("Hola");
                this.setState({
                    IniciarCursoPost:{
                        idEnviar: prop,
                        booleano: true
                    }
                })
            }).catch(err =>{
                console.error(err);
            })
    }
    /*PUT*/
    /*Este PUT actualiza usuario-calificación para no dejar calificar más un curso.*/
    putCalificacionCurso = async(prop) =>{
        /*UsuarioCalificación*/
        await axios.put(`http://localhost:3883/UsuCur/Put_Usuario-calificacion/Comunidad/${UsuarioI[0].id_usuario}&${prop}`)
            .then(res =>{
                console.log("SEHIZO EL PRIMER PUT");
            }).catch(err =>{
                if(err){
                    console.log(err);
                }
            });
    }
    /*Este PUT actualiza la valoración de un curso*/
    putCalificacionCurso2 = (prop, prop2, prop3) =>{
        let valoracion =(prop2 * prop3);
        let valoracion2 = valoracion + parseFloat(document.getElementById("num").value);
        let cant_votantes = prop3 + 1;
        let valoracion3 = valoracion2 /cant_votantes;
            let form2={
                valoracion: valoracion3,
                cant_votantes: cant_votantes
            }
            
                /*Cursos*/
        axios.put(`http://localhost:3883/Cur/put_cursos_valoracion/comunidad/${prop}`, form2)
        .then(res =>{

        }).catch(err =>{
            if(err){
                console.error(err);
            }
        });
        this.setState({modal1: {
            modal1bool: !this.state.modal1.modal1bool,
            modal1title: ""
        }});
        this.getCursos();
        this.getCursoIniciado();
        this.modal1Return();
    } 
    render() {
        return (
            <>
                {this.modal1Return()}
                <div className="flex">
                    <div className="Filtros">
                        <div className="Filtros2">
                            <input id="filt" placeholder="Buscar" className="FiltrosC2" onChange={this.filtrando} />
                        </div>
                    </div>
                    <div className="CardCI">
                        {this.state.actual.map((Esito, index) => {
                            if (Esito.categoria == "Integrado") {
                                return (
                                    <div id="MaxContC" key={index}>
                                        <div className="InfoContMinI2">
                                            <h3 className="TitleC TitlesI">{Esito.titulo}</h3>
                                        </div>
                                        <div className="CursoIC" key={index}>
                                            <img className="ImgCI" src={Esito.logo} />
                                            <div className="CursoIC2">
                                                <div className="InfoContMini">
                                                    <h5 className="TitlesI">Tematica: <br /> {Esito.tematica}</h5>
                                                    <h5 className="TitlesI">Materia: <br /> {Esito.materia}</h5>
                                                </div>
                                                <div id="BottonCI">
                                                    {/* <img className="Edit2" src="/Images/InfoCurso.png" /> */}
                                                    {this.IniciarCurso(Esito.id,Esito.id_creador)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div id="MaxContC" key={index}>
                                        <div className="InfoContMinI2">
                                            <h3 className="TitleC TitlesI">{Esito.titulo}</h3>
                                        </div>
                                        <div className="CursoIC" key={index}>
                                            <img className="ImgCI" src={Esito.logo} />
                                            <div className="CursoIC2">
                                                <div className="InfoContMini">
                                                    <h5 className="TitlesI">Tematica: <br /> {Esito.tematica}</h5>
                                                    <h5 className="TitlesI">Materia: <br /> {Esito.materia}</h5>
                                                </div>
                                                <div id="BottonCI">                          
                                                    {this.Accion1(Esito.id_creador, Esito.id, Esito.titulo, Esito.valoracion, Esito.cant_votantes)}
                                                    {this.IniciarCurso(Esito.id,  Esito.id_creador)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="minicont">
                                            <h3 className="TitleC TitlesI gridComunidadTitle">{Esito.usuario}</h3>
                                            {this.colorcito(Esito.valoracion, Esito.cant_votantes)}

                                        </div>
                                    </div>
                                );
                            }
                        })}
                        {this.final()}
                        <div id="Paginacion">
                            {this.flech()}
                            {this.state.array.map((Esito, index) => {
                                try{
                                const f=index;
                                if (f != this.state.posicion && (this.state.despaginar == f || this.state.despaginar == f - 1 || this.state.despaginar == f + 1)) {
                                    return (<><input key={index} className="botonescamb" type="button" value={f + 1} onClick={() => {
                                        this.setState({
                                            posicion: f,
                                            despaginar: f,
                                            actual: this.state.array[f]
                                        });
                                    }} /></>);

                                } else if (this.state.despaginar == f|| this.state.despaginar == f - 1 || this.state.despaginar == f + 1) {
                                    return (<><input key={index} className="botonescamb2" type="button" value={f + 1} /></>);
                                }}catch(err){}
                            })}
                            {this.flech2()}
                        </div>
                    </div>
                </div>
                {this.state.IniciarCursoPost.booleano && <Redirect to={{
                    pathname: "/Curso",
                    state: {
                        id: this.state.IniciarCursoPost.idEnviar,
                        pagina: this.props.location
                    }
                }}/> }
            </>
        );
    }
}

export default withRouter(Main3);