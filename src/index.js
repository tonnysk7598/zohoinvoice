import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import App from "App";

import configureStore from 'store';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
    , document.getElementById("root")
);
