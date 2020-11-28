import React from 'react';
import axios from 'axios';
import '../Styles/pantcarga.css';
import { Link, withRouter } from 'react-router-dom';
class Main4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CursoData : [],
            preguntas: []
        }
    }
    async componentDidMount() {
        await this.getInfoCurso();
        await this.getPreguntas();
    }
    componentDidUpdate(){
        document.getElementById("carga").style.display="none";
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
                        preguntas: this.state.preguntas
                    }}}>
                        <button className="LinkCursoMain4">Pruebate</button>
                    </Link>

                </div>
            </>
        );
    }
}

export default withRouter(Main4);