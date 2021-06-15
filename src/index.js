import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './configureStore';
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const store = configureStore();

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={App}/>
                {}
                <Route path='*' exact={true} component={App} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Routing/>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
