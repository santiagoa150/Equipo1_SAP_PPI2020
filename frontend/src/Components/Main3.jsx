import React from 'react';
import '../Styles/Main3.css';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';

class Main3 extends React.Component {    
    constructor(props) {
        super(props); 
        this.state = {
            filtrado: [],
            filtrar: [],
            posicion:0,
            tamaño:0,
            array:[],
            actual:[], 
            despaginar:0
        }
    }
     componentDidMount = async () => {
        
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/${this.props.location.state.pagina}`)
            .then(res => {
                this.setState({ filtrar: res.data});
                this.filtrando();             
            }).catch(err => {
                console.error(err);
            });
    }
    filtrando=()=>{
        let filtrado;
        let tamaño;
        let filtro=document.getElementById("filt").value;
        let tam=4;
        if( filtro=="" ){
            console.log("HOla");
            let x=Math.ceil(this.state.filtrar.length/tam);
            filtrado = this.state.filtrar;
            tamaño = x;
        
        }else{           
            let arrays1=this.state.filtrar.filter(Esito=> Esito.usuario?.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize())||Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize())||Esito.materia.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize())||Esito.tematica.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize()) );
            let x=Math.ceil(arrays1.length/tam);
                filtrado= arrays1;          
                tamaño= x; 
        }


        let cont=0;
        let arrays=[];
        for(let i=0;i<tamaño;i++){            
            let array2=[];
            for(let j=0;j<tam&&cont<filtrado.length;j++){
                array2.push(filtrado[cont]);
                cont++;
            }
            arrays.push(array2);
        }
        if(arrays[0]){
            this.setState({ 
                filtrado:filtrado,
                tamaño:tamaño,
                array:arrays,
                actual: arrays[this.state.posicion]});
        }else{
            this.setState({ 
                filtrado:filtrado,
                tamaño:tamaño,
                array:arrays,
                actual: []});  
        }
    }
    Accion1 = (prop) =>{
        if(prop == UsuarioI[0].id_usuario){
            return(
                <>
                    <img className="Edit2" src="/Images/Lapiz.png" />
                </>
            );
        }else{
            return(
                <>
                    <img className="Edit2" src="/Images/Star.png" />
                </>
            );
            
        }
    }
    final=()=>{
        if(this.state.posicion>=this.state.tamaño-1){
            return(<div><p>No hay mas cursos para mostrar</p></div>);
        }
    } 
    flech=()=>{
        if(this.state.despaginar==0){
            this.state.despaginar=1;
        }       
        if(this.state.despaginar!=1 && this.state.tamaño>3){
            return(
               <input className="botonescamb" type="button" value="◄" onClick={() =>{
                this.setState({
                    despaginar:this.state.despaginar-1
                });
            }} />
            );  
        }
    }
    flech2=()=>{
        if(this.state.despaginar==this.state.tamaño-1){
            this.state.despaginar=this.state.tamaño-2;
        }
        if(this.state.despaginar!=this.state.tamaño-2&&this.state.tamaño>3){
          return(
            <input className="botonescamb" type="button" value="►" onClick={() =>{
                this.setState({
                    despaginar:this.state.despaginar+1
                });
            }} />
            );  
        }
    }
    movflech2=()=>{       
        this.setState({despaginar:this.state.despaginar+1});
    }
        render() {
        return (
            <>
                <div className="flex">
                    <div className="Filtros">
                        <div className="Filtros2">
                            <input id="filt" placeholder="Buscar" className="FiltrosC2" onChange={this.filtrando}/>
                        </div>
                    </div>
                    <div className="CardCI">
                        {this.state.actual.reverse().map((Esito, index) => {
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
                                                    <Link to={{
                                                        pathname: "/Curso",
                                                        state: {
                                                            id: Esito.id
                                                        }
                                                    }}>
                                                        <button className="button buttonI">Iniciar curso</button>
                                                    </Link>
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
                                                    {this.Accion1(Esito.id_usuario)}
                                                    <Link to={{
                                                        pathname: "/Curso",
                                                        state: {
                                                            id: Esito.id
                                                        }
                                                    }}>
                                                        <button className="button buttonI">Iniciar curso</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="minicont">
                                            <h3 className="TitleC TitlesI">{Esito.usuario}</h3>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        {this.final()}                        
                        <div id="Paginacion">
                            {this.flech()}
                            {this.state.array.map((Esito, index) =>{
                                if(index != this.state.posicion && (this.state.despaginar==index || this.state.despaginar==index-1 ||this.state.despaginar==index+1)){
                                return(<><input className="botonescamb" type="button" value={index+1} onClick={() =>{
                                    this.setState({
                                        posicion:index,
                                        despaginar:index,
                                        actual: this.state.array[index]
                                    });
                                }}/></>);
                                                                    
                            }else if(this.state.despaginar==index || this.state.despaginar==index-1 ||this.state.despaginar==index+1){
                                return(<><input className="botonescamb2" type="button" value={index+1}/></>); 
                            }
                            })}
                            {this.flech2()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main3);