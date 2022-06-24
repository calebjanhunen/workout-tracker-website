import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBarStyles.css";

const NavBar = () => {
    return (
        <nav>
            <h1 className="title">Workout Tracker</h1>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/startWorkout">Start Workout</NavLink>
                </li>
                <li>
                    <NavLink to="/WorkoutHistory">Workout History</NavLink>
                </li>
            </ul>
            <button className="login-btn">Login</button>
        </nav>
    );
};

export default NavBar;
