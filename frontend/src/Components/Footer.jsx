import React from 'react';
import '../Styles/Footer.css'
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div id="Footer">
                <p>2020 © Learn With Us - <a className="A" href="https://agente003003003.wixsite.com/misitio" target="_blank">El pajarito</a></p>
            </div>
            </>
         );
    }
}
export default Footer;