import './App.css';
import './index.css';
import Header from "./components/Header";
import Home from "./components/Home";
import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Login from "./components/Login";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openHome: false,
            openLogin: false,
            show: false,
            username: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    showHome = () => {
        console.log("showHome App");
        this.setState({openHome: true, openLogin: false});
    }

    goToWelcome = () => {
        console.log("Go to Welcome");
        this.setState({openHome: false});
    }

    goToLogin = (open) => {
        console.log("Go to Login");
        this.setState({openLogin: open});
    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleShow = () => {
        this.setState({show: true})
    };

    render() {
        let login;
        if (this.state.openLogin) {
            login = <div className={'App-login'}>
                <Login className={'loginKey'} goToLogin={this.goToLogin} showHome={this.showHome}/>
            </div>
        } else if (this.state.show) {
            login = <div/>
        } else {
            login = <div/>
        }
        let home;
        if(this.state.openHome){
            home = <Home/>
        }else{
            home = <div/>
        }


        return (
            <>
                <Header
                    onEnter={this.showHome}
                    goToWelcome={this.goToWelcome}
                    goToLogin={this.goToLogin}
                    isOpen={this.state.openHome || this.state.openLogin}/>
                {home}
                {login}
            </>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {} = state;
    return {
    };
}

export default connect(mapStateToProps)(App);
