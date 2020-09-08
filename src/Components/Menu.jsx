import React from 'react';
import '../Styles/Menu.css';
import {withRouter,Link} from 'react-router-dom';
class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    desple=()=>{
        let comprobante=document.getElementById("obje").style.display!="block";
        if(comprobante){
            document.getElementById("obje").style.display="block";
            document.getElementById("des").value="▼ Cursos";
        }else{
            document.getElementById("obje").style.display="none";
            document.getElementById("des").value="► Cursos";
        }
    }
    render() { 
        return <>
        <div id="conatinerM">
            <Link className="esquina" to={this.props.Ruta}>
            <div id="XimageC">
                <img className="tama" onClick={this.Close} src="https://images.vexels.com/media/users/3/155473/isolated/preview/faa3172dd52035d0c227d7ecab4d6024-doodle-cruzado-x-by-vexels.png" />
            </div>
            </Link>
            <Link className="linkm" to="/principal">
                <input type="button" value="Inicio"/>
            </Link>
            <div className="grupo"><input className="linkm" id="des" type="button" value="► Cursos" onClick={this.desple}/>
                <ul id="obje"className="lista">
                    <li><Link className="linkm" to="/Integrados"><input type="button" value="Integrados"/></Link></li>
                    <li><Link className="linkm"><input type="button" value="Comunidad"/></Link></li>
                    <li><Link className="linkm"><input type="button" value="Mis cursos"/></Link></li>
                </ul>
            </div>
            <Link className="linkm">
                <input type="button" value="Clases"/>
            </Link>
        </div>
        </>
        ;
    }
}
 
export default withRouter(menu);