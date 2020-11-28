import React from 'react';

import '../Styles/Cursos.css';
import { withRouter } from 'react-router-dom';
import Header from "../Components/Header5";
import Footer from "../Components/Footer";
import Main9 from "../Components/Main9";
import axios from 'axios';
class Examen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Header />
                <Main9 />
                <Footer />
            </>
        );
    }
}

export default withRouter(Examen);