import React from 'react';
import '../Styles/Header4.css';
import {withRouter} from 'react-router-dom';
class Header4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div id="Header4Container">
                <h2>Edición de curso</h2>
            </div>
            </>
         );
    }
}
export default withRouter(Header4);