import vaLogo from "../images/LogoVa.svg";
import arrDown from "../images/arrow-down.svg"
import arrDownSel from "../images/arrow-down-sel.svg"
import React, {Component} from "react";
import PropTypes from 'prop-types';
import '../App.css';
import '../index.css';
import UserMenu from "./UserMenu";
import {isAuthentified} from "../Helpers";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authClicked: false,
        }
    }

    componentDidMount() {
        if (isAuthentified()) {
            this.props.onEnter();
        }
    }

    logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.props.goToWelcome();
    }

    username = () => {
        return isAuthentified() ? localStorage.user : "public";
    }

    render() {
        const open = this.props.isOpen;
        let head;
        let authIcon;
        let backMenu;
        if (this.state.authClicked) {
            authIcon =
                <div>
                    <img src={arrDownSel} className="app-auth-arr"/>
                    <UserMenu auth={isAuthentified()} name={this.username()} logout={this.logout}/>
                </div>
            backMenu = <div className="auth-screen" onClick={() => {
                this.setState({authClicked: !this.state.authClicked})
            }}/>
        } else {
            authIcon = <img src={arrDown} className="app-auth-arr"/>
            backMenu = <div/>
        }
        if (!open) {
            head =
                <header className="App-header">
                    <div className={'welcome-stack'}>
                        <img src={vaLogo} className="App-logo" alt="logo"/>
                        <p> Consultation Prévoyance </p>
                        <div>
                            <div style={{
                                display: 'inline-block',
                                color: '#009036',
                                fontSize: '14px',
                                marginRight: '10px',
                                cursor: 'pointer'
                            }} onClick={() => {
                                this.props.goToLogin(true)
                            }}>S'identifier
                            </div>
                        </div>
                    </div>
                </header>
        } else {
            head =
                <header>
                    <div className="App-header-top">
                        <img src={vaLogo} className="App-logo-top" alt="logo"/>
                    </div>
                    <div className="auth-user">{this.username()}</div>
                    <div className="auth-menu" onClick={() => {
                        this.setState({authClicked: !this.state.authClicked})
                    }}>
                        {authIcon}
                    </div>
                </header>
        }
        return (
            <div className="App">

                {backMenu}
                {head}

            </div>
        );
    }
}

Header.propTypes = {
    onEnter: PropTypes.func.isRequired,
};

export default Header;