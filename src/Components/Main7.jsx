import React from 'react';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
import {Usuarios} from '../Utiles/Mocks/Usuarios';
import { User_clase } from '../Utiles/Mocks/User_clase';
import {withRouter} from 'react-router-dom';
import '../Styles/Main7.css';
class Main7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Clase: this.props.location.state.InfoClass
         }
    }
    Accion1 = () =>{
        if(this.state.Clase.idusuario == UsuarioI[0].id){
            return(<button>Crear curso</button>)
        }
    }

    render() { 
        return (  
            <>
            <div id="Main7Container">
                <div id="ClasesMain7">

                </div>
                <div id="UsersMain7">
                    {this.Accion1()}
                    <button>Ocultar</button>
                    {User_clase.map((Esito, index) =>{
                        let User = "";
                        for(let i = 0; i < Usuarios.length ; i++){
                            for(let j = 0; j < User_clase.length; j++){
                                if(Usuarios[i].id ==User_clase[j].idusuario ){
                                    User = Usuarios[i].Nombre + " " + Usuarios[i].Apellido;
                                }
                            }
                        }
                        if(Esito.idclase == this.state.Clase.id){
                        return(
                            <div key={index} className="User_card">
                                <p>{User}</p>
                            </div>
                        );
                    }
                    })}
                </div>
            </div>
            </>
        );
    }
}
 
export default withRouter(Main7);