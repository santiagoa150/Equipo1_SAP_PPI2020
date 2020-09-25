import React from 'react';
import '../Styles/Main2.css';
import {withRouter, Link} from 'react-router-dom';
class Main2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return (
            <>            
               <div className="flex" >
                    <div className="conten">
                        <h2 className="tecto">Welcome</h2><br/>
                        <p className="tecto">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore dicta nisi omnis saepe, reiciendis accusantium nam neque similique voluptas recusandae error, tempora corporis. Maiores tempora dolor perferendis, eligendi inventore laborum. 
                        </p>
                    </div>
                    <div className="conten">                    
                        <h2 className="tecto">Video introductorio</h2><br/>
                        <iframe className="video" src="https://www.youtube.com/embed/Wh1_nlLpNSM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="conten">
                        <h2 className="tecto">Nuestras Redes</h2><br/>
                        <div className="redes">
                            <div id="FB"></div>
                            <div id="tweet"></div>
                            <div id="instag"></div>
                        </div>
                    </div>                
                </div>
            </>
          );
    }
}
export default withRouter(Main2);