import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Profile.css';

const Profile = () => {
    const username = useSelector(state => state.auth.user);
    const [avatarDisplay, setAvatarDisplay] = useState(username[0]);
    const [avatarHover, setAvatarHover] = useState(false);
    return (
        <div>
            <Avatar
                id="profile-avatar"
                onMouseEnter={() => setAvatarHover(true)}
                onMouseLeave={() => setAvatarHover(false)}
            >
                {avatarHover ? (
                    <p className="change-profile-pic">Change Profile Picture</p>
                ) : (
                    avatarDisplay
                )}
            </Avatar>
            <p>Username: {username}</p>
        </div>
    );
};

export default Profile;
