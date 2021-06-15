import React, {Component} from "react";
import './Login.css';
import {connect} from "react-redux";
import {fetchSigninData} from "../actions";
import {isAuthentified} from "../Helpers";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            disabled: true,
            submit: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentSignin.response !== undefined &&
            this.props.currentSignin.response.accessToken !== null &&
            !this.props.currentSignin.isFetching &&
            this.state.submit && isAuthentified()) {
            let closeButton = this.refs.refClose;
            closeButton.click();
            console.log("componentDidUpdate Login");
            this.props.showHome();
        } else if (this.props.currentSignin.response !== undefined &&
            this.props.currentSignin.response.accessToken === null) {
            alert("Echec d'identification!");
        }
    }

    setUsername = (username) => {
        this.setState({username: username}, this.checkAllFields);
    }

    setPassword = (password) => {
        this.setState({password: password}, this.checkAllFields);
    }

    checkAllFields = () => {
        if (this.state.username !== '' &&
            this.state.password !== '') {
            this.setState({disabled: false, submit: false});
        } else {
            this.setState({disabled: true});
        }
    }

    submitForm = () => {
        const {dispatch} = this.props;
        dispatch(fetchSigninData(this.state.username, this.state.password));
        this.setState({submit: true});
    }

    render() {
        return (
            <div>
                <div className={"title-sign"}>
                    Identifiez-vous
                </div>
                <div>
                    <form>
                        <div className="text-cont">
                            <input className="text-field"
                                   type="text"
                                   id="screen"
                                   value={this.state.username}
                                   onChange={(e) => this.setUsername(e.target.value)}
                                   autoComplete="off"
                                   required
                            />
                            <span className="floating-lab">Nom d'Utilisateur</span>
                        </div>
                        <div className="text-cont">
                            <input className="text-field"
                                   type="password"
                                   id="pass1"
                                   value={this.state.password1}
                                   onChange={(e) => this.setPassword(e.target.value)}
                                   autoComplete="off"
                                   required
                            />
                            <span className="floating-lab">Mot de passe</span>
                        </div>
                    </form>
                </div>

                <div className={'login-buttons'}>
                    <div className={'login-button-close'} ref="refClose" onClick={() => {
                        this.props.goToLogin(false)
                    }}>
                        Annuler
                    </div>

                    <div className={'login-button-close'} disabled={this.state.disabled}
                         onClick={this.submitForm}>
                        S'identifier
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentSignin} = state;
    return {
        currentSignin
    };
}

export default connect(mapStateToProps)(Login);