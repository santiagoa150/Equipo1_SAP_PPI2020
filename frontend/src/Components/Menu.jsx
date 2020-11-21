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
            <Link className="linkm" to="/principal">
                <input type="button" value="Inicio"/>
            </Link>
            <div className="grupo"><input className="linkm" id="des" type="button" value="► Cursos" onClick={this.desple}/>
                <ul id="obje"className="lista">
                    <li><Link className="linkm" to={{pathname:"/Integrados",state:{pagina:"Integrado"}}}><input type="button" value="Integrado"/></Link></li>
                    <li><Link className="linkm" to={{pathname:"/Integrados",state:{pagina:"Comunidad"}}}><input type="button" value="Comunidad"/></Link></li>
                    <li><Link className="linkm" to="/misCursos"><input type="button" value="Mis cursos"/></Link></li>
                </ul>
            </div>
            <Link className="linkm" to={{pathname: "/Clases", state:{i: "undefined"}}}>
                <input type="button" value="Clases"/>
            </Link>
        </div>
        </>
        ;
    }
}
 
export default withRouter(menu);