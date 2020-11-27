import React from 'react';
import '../Styles/Main2.css';
import { withRouter } from 'react-router-dom';
class Main2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){       
        document.getElementById("carga").style.display="none";        
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                <div className="flex" >
                    <div className="conten">
                        <h2 className="tecto">Bienvenido</h2><br />
                        <p className="tecto">
                            Bienvenidos al aplicativo Learn With Us, esta es la pantalla principal el menu par navegar lo puede encontrar en la parte de arriba a la izquierda, para entender el funcionamiento del sofware puede ver el video introductorio aca debajo.
                        </p>
                    </div>
                    <div className="conten">
                        <h2 className="tecto">Video introductorio</h2><br />
                        <iframe className="video" src="https://www.youtube.com/embed/McGjmFXrdn0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" frameBorder="0"></iframe>
                    </div>
                    <div className="conten">
                        <h2 className="tecto">Nuestras Redes</h2><br />
                        <div className="redes">
                            <div id="FB"></div>
                            <a id="tweet" href="https://agente003003003.wixsite.com/misitio" target="_blank">
                            </a>
                            <div id="instag"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default withRouter(Main2);