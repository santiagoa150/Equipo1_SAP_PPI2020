import React from 'react';
import axios from 'axios';
import '../Styles/pantcarga.css';
import { Link, withRouter } from 'react-router-dom';
class Main4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CursoData : [],
            preguntas: [],
            modal1: {
                modal1bool: false,
                modal1title: "",
                modal1Id: 0,
                modalValoracion: 0,
                modalCantVotantes: 0
            }

        }
    }
    async componentDidMount() {
        await this.getInfoCurso();
        await this.getPreguntas();
    }
    componentDidUpdate(){
        document.getElementById("carga").style.display="none";
    } /*MODAL1*/
    /*Determina si el modal 1 se pinta o no*/
    modal1 = (prop, prop2, prop3, prop4) => {
        this.setState({
            modal1: {
                modal1bool: true,
                modal1title: prop2,
                modal1Id: prop,
                modalValoracion: prop3,
                modalCantVotantes: prop4
            }
        });


    }
    /*Retorna el modal 1*/
    modal1Return = () => {
            let Data = this.state.dataCursosI.filter(filter => filter.id_curso == this.state.modal1.modal1Id && filter.id_usuario == UsuarioI[0].id_usuario && filter.valoracion_curso == 0);
            if (Data.length != 0) {
                return (
                    <>
                        <div className="ModalFondo">
                            <div className="Modal1">
                                <div className="ModalTitle">
                <h2>Empezar examen</h2>
                                </div>
                                <p>
                                Si inicia el examen debera acabarlo este tiene {this.state.cant_preguntas} preguntas, ¿Desea continuar?
                                </p>
                                <button className="button buttonModal1" onClick={() => { this.putCalificacionCurso(this.state.modal1.modal1Id); this.putCalificacionCurso2(this.state.modal1.modal1Id, this.state.modal1.modalValoracion, this.state.modal1.modalCantVotantes) }}>Calificar</button>
                                <button className="button buttonModal1" onClick={() => {
                                    this.setState({
                                        modal1: {
                                            modal1bool: !this.state.modal1.modal1bool
                                        }
                                    })
                                }
                                }>Cancelar</button>
                            </div>
                        </div>
                    </>
                );
            
        }
    }
    getInfoCurso = async() =>{
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
        .then(res =>{
            this.setState({CursoData: res.data});
            document.getElementById("TeoriaCurso").innerHTML = this.state.CursoData[0].contenido_t;
        }).catch(err =>{
            console.error(err);
        })
    }
    getPreguntas = async () =>{
        await axios.get(`http://localhost:3883/Cur/get_preguntas_informacion/ContenidoE/${this.props.location.state.id}`)
            .then(res =>{
                console.log(res.data);
                this.setState({
                    preguntas: res.data                    
                });
            }).catch(err =>{
                if(err){
                    console.error(err);
                }
            })
    }
    render() {
        return (
            <>  
                {this.modal1Return()}
                <div className="Cargando" id="carga"></div>
                <div id="Main4Container">
                    <div id="TeoriaCurso">
                    </div>

                    <Link id="DidaCurso" to={{pathname:"/Didactico",
                    state:{
                        id: this.state.CursoData[0]?.id
                    }}}>
                        <button className="LinkCursoMain4">Jugar</button>
                    </Link>

                    <Link id="ExaCurso" to={{pathname:"/Examen",
                    state:{
                        id: this.state.CursoData[0]?.id,
                        cantidad: this.state.CursoData[0]?.cant_preguntas,
                        preguntas: this.state.preguntas,
                        calificacion: this.state.CursoDapaginata[0]?.calificacion,
                        pagina: this.props.location.state.pagina
                    }}}>
                        <button className="LinkCursoMain4">Pruebate</button>
                    </Link>

                </div>
            </>
        );
    }
}

export default withRouter(Main4);