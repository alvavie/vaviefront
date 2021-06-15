import React from "react";

import './UserMenu.css';
import logoutIm from "../images/logout.svg";
import userIm from "../images/user_ic.svg";

const UserMenu = ({auth, name, logout}) => {

    let logoutDiv;
    if (auth) {
        logoutDiv = <div className="h-line">
            <div className="user-menu-logout">
                <img src={logoutIm} className="logout-image" alt="logo"/>
                <div className="logout-text" onClick={logout}>Se déconnecter</div>
            </div>
        </div>
    } else {
        logoutDiv = <div/>
    }
    return (
        <div className="user-menu">
            <div className="user-menu-name">
                <img src={userIm} className="user-image"/>
                <div>{name}</div>
            </div>
            {logoutDiv}
        </div>

    );
};

export default UserMenu;