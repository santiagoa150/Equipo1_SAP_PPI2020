import React from 'react';
import '../Styles/Main3.css';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
let dataGetCursoIniciado = [];
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
            }
        }
    }
    componentDidMount = async () => {

        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/${this.props.location.state.pagina}`)
            .then(res => {
                this.setState({ filtrar: res.data });
                this.filtrando();
            }).catch(err => {
                console.error(err);
            }); 

        this.getCursoIniciado();
    }
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
    Accion1 = (prop, prop2) => {
        
        let Data;
        if (prop == UsuarioI[0].id_usuario) {
            return (
                <>
                    <img className="Edit2" src="/Images/Lapiz.png" />
                </>
            );
        } else {
            Data = this.state.dataCursosI.filter(filtro => filtro.id_curso == prop && !filtro.valoracion_curso);
            if(Data.length == 0){  
            return (
                <>
                    <img className="Edit2" src="/Images/Star.png" />
                </>
            );
            }else{
                /*FALTA ESTILO*/
            }
        }
        
    }
    final = () => {
        if (this.state.posicion >= this.state.tamaño - 1) {
            return (<div><p>No hay mas cursos para mostrar</p></div>);
        }
    }
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
    movflech2 = () => {
        this.setState({ despaginar: this.state.despaginar + 1 });
    }
    colorcito = (prop, prop2) => {
        if (prop2 == 0) {
            return (<p className="gridComunidadVal blancoText">{prop}</p>)
        } else {
            if (prop < 3) {
                return (<p className="gridComunidadVal redText">{prop}</p>)
            } else if (prop < 4) {
                return (<p className="gridComunidadVal orangeText">{prop}</p>)
            } else if (prop < 4.5) {
                return (<p className="gridComunidadVal yellowText">{prop}</p>)
            } else {
                return (<p className="gridComunidadVal greenText">{prop}</p>)
            }
        }
    }
    getCursoIniciado = async ()=>{
        await axios.get(`http://localhost:3883/UsuCur/traer-UsuarioCalificacion/Integrado-Comunidad/${UsuarioI[0].id_usuario}`)
        .then(res => {
            this.setState({dataCursosI: res.data});
        }).catch(err => {
            console.error(err);
        })
    }
    IniciarCurso = (prop, prop2) => {
        let Data = this.state.dataCursosI.filter(filtro => filtro.id_usuario == UsuarioI[0].id_usuario && filtro.id_curso == prop);
        if (Data.length != 0 || prop2 == UsuarioI[0].id_usuario) {
            return (
                <Link to={{
                    pathname: "/Curso",
                    state: {
                        id: prop
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
                console.log(this.state.IniciarCursoPost.booleano)
            }).catch(err =>{
                console.error(err);
            })
    } 
    render() {
        return (
            <>
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
                                                    {this.Accion1(Esito.id_usuario, Esito.id)}
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
                                if (index != this.state.posicion && (this.state.despaginar == index || this.state.despaginar == index - 1 || this.state.despaginar == index + 1)) {
                                    return (<><input className="botonescamb" type="button" value={index + 1} onClick={() => {
                                        this.setState({
                                            posicion: index,
                                            despaginar: index,
                                            actual: this.state.array[index]
                                        });
                                    }} /></>);

                                } else if (this.state.despaginar == index || this.state.despaginar == index - 1 || this.state.despaginar == index + 1) {
                                    return (<><input className="botonescamb2" type="button" value={index + 1} /></>);
                                }
                            })}
                            {this.flech2()}
                        </div>
                    </div>
                </div>
                {this.state.IniciarCursoPost.booleano && <Redirect to={{
                    pathname: "/Curso",
                    state: {
                        id: this.state.IniciarCursoPost.idEnviar
                    }
                }}/> }
            </>
        );
    }
}

export default withRouter(Main3);