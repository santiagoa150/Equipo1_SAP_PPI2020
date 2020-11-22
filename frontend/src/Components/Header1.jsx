import React from 'react';
import '../Styles/Header.css';
export default class Header1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
            <div id="Header1Container">
                <div id="LogoHeader1"></div>
                <h1 id="TitleHeader1">Learn With Us</h1>
            </div>
            </>
          );
    }
}