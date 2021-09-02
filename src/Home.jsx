/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import LoadingPage from './Loading';
import IndexLayout from 'layouts/IndexLayout';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

class Home extends Component {
  state = {
    loading: true,
    fetching: false,
  };

  render() {
    const { fetching } = this.state;
    if (fetching) {
      return (
        <LoadingPage />
      );
    }
    return (
        <Router history={hist}>
        <Switch>
          <Route render={(props) => <IndexLayout {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default Home;
