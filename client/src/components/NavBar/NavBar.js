import { Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { apiSlice } from 'redux/api/apiSlice';
import { useLogoutMutation } from 'redux/features/authApiSlice';
import { clearState } from 'redux/reducer/authSlice';

import './NavBarStyles.css';

const NavBar = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const username = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState(null);

    async function handleLogout() {
        await logout();
        dispatch(clearState());
        dispatch(apiSlice.util.resetApiState());
        navigate('/login');
    }

    return (
        <nav>
            <h1 className="title">Workout Tracker</h1>
            <ul>
                <li>
                    <NavLink
                        to="/
                    "
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/select-workout-template">
                        Start Workout
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create-workout-template">
                        Create Workout Template
                    </NavLink>
                </li>
                <li>
                    <NavLink to="workout-history">Workout History</NavLink>
                </li>
                <li>
                    <NavLink to="explore">Explore</NavLink>
                </li>
            </ul>
            <h3
                className="navbar-username"
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                {username} &#129171;
            </h3>
            {/* <button className="logout-btn navbar-btn" onClick={handleLogout}>
                Logout
            </button> */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                className="profile-menu"
            >
                <MenuItem
                    className="menu-item"
                    onClick={() => {
                        navigate('/profile');
                        setAnchorEl(null);
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem className="menu-item" onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>
        </nav>
    );
};

export default NavBar;
