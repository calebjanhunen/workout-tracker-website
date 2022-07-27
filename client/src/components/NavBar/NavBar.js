import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NavBarStyles.css";

const NavBar = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const username = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    return (
        <nav>
            <h1 className="title">Workout Tracker</h1>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/start-workout">Start Workout</NavLink>
                </li>
                <li>
                    <NavLink to="/create-workout-template">
                        Create Workout Template
                    </NavLink>
                </li>
                <li>
                    <NavLink to="workout-history">Workout History</NavLink>
                </li>
            </ul>
            {accessToken ? (
                <>
                    <h3 className="navbar-username">{username}</h3>
                    <button className="logout-btn navbar-btn">Logout</button>
                </>
            ) : (
                <button
                    className="login-btn navbar-btn"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            )}
        </nav>
    );
};

export default NavBar;
