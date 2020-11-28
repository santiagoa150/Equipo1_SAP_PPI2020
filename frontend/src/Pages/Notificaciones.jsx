import React from 'react';
import axios from 'axios';
import Header7 from '../Components/Header7';
import Main10 from '../Components/Main10';
class Notificaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                <Header7 />
                <Main10/>
            </>
        );
    }
}

export default Notificaciones;