import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./NavBarStyles.css";

const NavBar = () => {
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
            <button className="login-btn" onClick={() => navigate("/login")}>
                Login
            </button>
        </nav>
    );
};

export default NavBar;
