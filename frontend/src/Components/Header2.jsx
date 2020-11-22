import React from 'react';
import '../Styles/Header2.css';
import '../Styles/Header2.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI} from '../Utiles/Mocks/UsuarioI';
let x, bool = false;
class Header2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        let avatar = '';
        if(UsuarioI[0].avatar == null){
            avatar= 'https://1.bp.blogspot.com/-p-TNqGEoS5w/X1PrFJ6rBYI/AAAAAAAAPQU/cgfqUztLg1YJL0zxyfRp8sEkhWGsymFUwCLcBGAsYHQ/s16000/Perf%25C3%25ADlLogo.png'
        }else{
            avatar= UsuarioI[0].avatar;
        }
        document.getElementById("profile").style.backgroundImage = "url("+ avatar +")";
     }
     
    /*METODOS QUE HACEN EL CORRECTO FUNCIONAMIENTO DEL MENÚ*/
    ureles = () => {
        x = this.props.location.pathname;
        let pathfin = x.substr(x.length - 1);
            if (pathfin != "_") {
                return <>
                {this.algo()}        
                </>;
            }
            else {
                if(this.props.Componente != "/Integrados"){   
                return <>
                <Link id="link" to={this.props.Componente}>
                    <div id="menu">
                    </div>
                </Link>
                </>;
                } else {
                    return <>
                    <Link id="link" to={{pathname:this.props.Componente, state:{pagina:this.props.location.state.pagina}}}>
                    <div id="menu">
                    </div>
                </Link>
                    </>
                }
            }
    }
    algo = () =>{
        if(this.props.Componente != "/Integrados"){
            return( <Link to={{pathname: "/Principal_", 
         state:{
         x: x}}}>
             <div id="menu">
             </div>
         </Link>)
         } else {
             return(
                 <Link to={{pathname: "/Principal_", 
         state:{
         x: x,
         pagina: this.props.location.state.pagina}}}>
             <div id="menu">
             </div>
         </Link>
             )
         }
    }
    minieventico = () =>{
        bool = true;
    }


    render() {
        return (
            <>
                <div id="Header2Container">
                    {this.ureles()}
                    <div id="logo">
                    </div>
                    <Link to={{
                        pathname: "/Perfíl", state: {
                            x: x,
                            x2: this.props.Componente,
                            x3: this.props.Pagina
                        }
                    }}>
                        <div id="profile">
                        </div>
                    </Link>
                </div>
            </>
        );
    }
}

export default withRouter(Header2);