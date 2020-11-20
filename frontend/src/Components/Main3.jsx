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
            actual:[]
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/${this.props.location.state.pagina}`)
            .then(res => {
                this.setState({ filtrar: res.data});
                this.filtrando();             
            }).catch(err => {
                console.error(err);
            });
    }
    cambpocision=(prop)=>{
        this.setState({
            posicion:prop
        });
    }
    paginas=()=>{
        for(let x=0; x<this.state.tamaño;x++){
            return(<><input className="botonescamb" type="button" value={x+1} onClick="this.cambpocision(x)"/></>);
        }
    }
    filtrando=()=>{
        let filtro=document.getElementById("filt").value;
        if( filtro=="" ){
            let x=Math.ceil(this.state.filtrar.length/2);
            this.setState({ filtrado: this.state.filtrar,
            tamaño:x
        });
        }else{
            let arrays1=this.state.filtrar.filter(Esito=> Esito.usuario?.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize())||Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize())||Esito.materia.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize())||Esito.tematica.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize()) );
            let x=Math.ceil(arrays1.lenght/2);
            this.setState({
                filtrado:arrays1,                
                tamaño: x });
        }
        let cont=0;
        let arrays=[];
        for(let i=0;i<this.state.tamaño&&cont<this.state.filtrado.length;i++){            
            let array2=[];
            for(let j=0;j<2&&cont<this.state.filtrado.length;j++){
                array2.push(this.state.filtrado[cont]);
                cont++;
            }
            arrays.push(array2);
        }
        this.setState({ array:arrays});
        this.setState({ 
            actual: this.state.array[this.state.posicion]
        });
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
        if(this.state.posicion==this.state.tamaño-1){
            return(<div><p>No hay mas cursos para mostrar</p></div>);
        }
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
                        {this.paginas()}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main3);