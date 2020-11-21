import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import '../Styles/Cursos.css';



class Header5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            DataCurso: []
         }
    }
    async componentDidMount() {
        await axios.get(`http://localhost:3883/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
        .then(res =>{
            this.setState({DataCurso: res.data});
        }).catch(err =>{
            console.error(err);
        })
    }

    render() { 
        
        return (
            <>
                <div id="Header3Container">
                    <Link to={{pathname:"/Curso",
                    state:{
                        id: this.state.DataCurso[0]?.id
                    }}}>
                    <div id="AtrasCurso">

                    </div>
                    </Link>
                         <h2 id="TitleCurso">{this.state.DataCurso[0]?.titulo}</h2>
                    <span></span>
                </div>
            </>
          );
    }
}
 
export default withRouter(Header5);