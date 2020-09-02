import React from 'react';

import Header1 from '../Components/Header1';
import Main1 from '../Components/Main1';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return (
            <>
            <Header1 />
            <Main1 />
            </>
          );
    }
}
 
export default Home;