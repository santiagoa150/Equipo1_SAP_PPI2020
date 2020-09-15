import React from 'react';
import '../Styles/Main5.css';
import {withRouter, Link} from 'react-router-dom';
import {UsuarioI} from '../Utiles/Mocks/UsuarioI';
import {Clases} from '../Utiles/Mocks/Clases';
import {User_clase} from '../Utiles/Mocks/User_clase';
class Main5 extends React.Component {
    componentDidMount(){
        document.getElementById("imgclases").style.backgroundImage = "url("+ UsuarioI[0].image + ")";
     }
    constructor(props) {
        super(props);
        this.state = { 
           
         }
    }

    render() { 
        return (
            <>  
                <div className="contM5">
                    <div className="franja">
                        <div id="infop">
                            <div id="imgclases"></div>
                            <div id="contid">Tu id:{UsuarioI[0].id}</div>
                            <div id="botonear"><input type="button" value="Unirse"/><input type="button" value="Crear"/></div>
                        </div>
                        <div id="conclases">
                            <div id="clasesP">
                                <input type="button" value="Clases creadas ▼"/>
                                {Clases.filter(Esito => UsuarioI[0].id==Esito.idusuario).map((Esito,Index)=>{
                                return(<>
                                    <div className="cardsclas"key={Index}>
                                        <div className="titulo">
                                            <h3>{Esito.titulo}</h3>
                                            <h4>Fecha de creacion: <br/>
                                            {Esito.fechaC.toLocaleDateString()}
                                            </h4>                                            
                                            </div>  
                                            <div className="botoncard"><Link><input type="button" value="Ir"/></Link>
                                            <h4>Id: {Esito.id}</h4>
                                            </div>
                                        </div>
                                    </>);
                                })}
                            </div>
                            <div id="contidU">
                                <input type="button" value="Clases inscritas ▼"/>
                                {User_clase.filter(Esito => UsuarioI[0].id==Esito.idusuario).map((Esito,Index)=>{
                                    return(<>
                                    <div className="cardsclas"key={Index}>
                                        <div className="titulo">
                                            <h3>{Clases[Esito.idclase].titulo}</h3>
                                            <h4>Fecha de creacion:<br/>
                                            {Clases[Esito.idclase].fechaC.toLocaleDateString()}
                                            </h4>
                                        </div>
                                        <div className="botoncard"><Link><input type="button" value="Ir"/></Link>
                                        <h4>Id: {Esito.idclase}</h4>
                                        </div>
                                    </div>
                                    </>);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
          );
    }
}
 
export default withRouter(Main5);
