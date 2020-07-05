import React from "react";
import ReactDOM from "react-dom";
import App from './components/App.js';
import './styles/style.scss';
import { Provider } from 'react-redux';
import store from "./store/reducers/index.js";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
