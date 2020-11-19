import React from 'react';

import '../Styles/Cursos.css';
import { Link, withRouter } from 'react-router-dom';
import { Cursos } from '../Utiles/Mocks/Cursos';

import Header from "../Components/Header5";
import Footer from "../Components/Footer";
class Didactico extends React.Component {
    componentDidMount() {
    }
    constructor(props) {
        super(props);
        this.state = {
            Curso: Cursos[this.props.location.state.id]
        }
    }

    render() {
        return (
            <>
                <Header />
                <iframe className="formGames" src="./Games/sudokus.html"></iframe>
                <Footer />
            </>
        );
    }
}

export default withRouter(Didactico);