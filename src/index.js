import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Pages/Home';
import Principal from './Pages/Princiapl';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
      <Route path="/Principal">
          <Principal />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);