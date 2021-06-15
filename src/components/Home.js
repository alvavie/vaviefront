import React, {Component} from "react";
import './Home.css';
import {fetchClientData, fetchContractsData} from "../actions";

import {connect} from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClient: false,
            dataContract: false,
            clientName: ''
        }
    }

    componentDidMount() {
        console.log("componentDidMount Home");
        let name = localStorage.user;
        console.log(name);
        this.setState({dataClient: false, dataContract: false});
        const {dispatch} = this.props;
        dispatch(fetchClientData(localStorage.user));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentClient.client !== undefined && !this.props.currentClient.isFetching && !this.state.dataClient) {
            console.log("client received");
            let client = this.props.currentClient.client;
            this.setState({dataClient: true, client: client});
            this.requestContracts(client.clientId);
        }
        if (this.props.currentContracts.contracts !== undefined && !this.props.currentContracts.isFetching && !this.state.dataContract) {
            console.log("contracts received");
            let contracts = this.props.currentContracts.contracts;
            console.log(contracts);
            this.setState({dataContract: true, contracts: contracts});
        }
    }

    requestContracts = (clientId) => {
        const {dispatch} = this.props;
        dispatch(fetchContractsData(clientId));
    }

    openContract = (contract) => {
        console.log(contract.contractId);
    }

    render() {
        const dataClient = this.state.dataClient;
        const dataContract = this.state.dataContract;
        const contracts = this.state.contracts;
        let viewClient;
        let viewContracts;

        if (dataClient) {
            let name = this.state.client.name + " " + this.state.client.lastname;
            let line1 = "Ville: " + this.state.client.city;

            let d = this.state.client.birthDate;
            d = d.split('T')[0];
            let line2 = "Date de Naissance: " + d;
            let line3 = "Nationalité: " + this.state.client.nationality;
            let line4 = this.state.client.smoker ? "Fumeur" : "Non Fumeur";
            let line5 = "Client Id: " + this.state.client.clientId;

            viewClient = <div className={'client-panel'}>
                <table className={'table-cl'}>
                    <tbody>
                    <tr>
                        <td>
                            <tr className={'th-name'}>{name}</tr>
                            <tr className={'th-line1'}>{line1}</tr>
                            <tr className={'th-line1'}>{line2}</tr>
                            <tr className={'th-line1'}>{line3}</tr>
                            <tr className={'th-line1'}>{line4}</tr>
                            <tr className={'th-line1'}>{line5}</tr>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        } else {
            viewClient = <div/>
        }

        if (dataContract) {

            viewContracts = <div className={'panel-contracts'}>
                {contracts.map(repo => (

                    <div className={'ctr-module'} key={repo.contractId} onClick={() => this.openContract(repo)}>
                        <table className={'ctr-table'}>
                            <tbody>
                            <tr>
                                <td>
                                    <tr className={'tr-key'}>contract Id</tr>
                                    <tr className={'tr-value'}>{repo.contractId}</tr>
                                </td>
                                <td>
                                    <tr className={'tr-key'}>prime</tr>
                                    <tr className={'tr-value'}>{repo.premiumAmount}</tr>
                                </td>
                                <td>
                                    <tr className={'tr-key'}>capital décès</tr>
                                    <tr className={'tr-value'}>{repo.deathamount}</tr>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>


                ))}
            </div>


        } else {
            viewContracts = <div/>
        }

        return (
            <div>
                <div className={'home-top-welcome'}>
                    Consultation Prévoyance
                </div>
                <div>
                    {viewClient}
                </div>
                <div className={'home-contracts'}>
                    Liste de Contracts
                </div>
                <div>
                    {viewContracts}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentClient, currentContracts} = state;
    return {
        currentClient,
        currentContracts
    };
}

export default connect(mapStateToProps)(Home);