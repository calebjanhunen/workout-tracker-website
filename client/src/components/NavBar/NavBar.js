import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useLogoutMutation } from "redux/features/authApiSlice";
import { clearState } from "redux/reducer/authSlice";

import "./NavBarStyles.css";

const NavBar = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const username = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    async function handleLogout() {
        await logout();
        dispatch(clearState());
        navigate("/");
    }

    return (
        <nav>
            <h1 className="title">Workout Tracker</h1>
            <ul>
                <li>
                    <NavLink to="/home">Home</NavLink>
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
            <h3 className="navbar-username">{username}</h3>
            <button className="logout-btn navbar-btn" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default NavBar;
