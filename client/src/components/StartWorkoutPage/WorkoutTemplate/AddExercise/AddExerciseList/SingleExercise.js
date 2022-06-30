import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisH,
    faTrashAlt,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useDeleteExerciseMutation } from "../../../../../redux/features/api/exercisesApi";

import "./AddExerciseStyles.css";

const SingleExercise = ({ exercise, setExerciseForm }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteExercise] = useDeleteExerciseMutation();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const menuItemStyles = {
        fontSize: "12px",
    };

    function handleClose() {
        setAnchorEl(null);
    }

    async function handleDelete() {
        setIsDeleting(true);
        await deleteExercise(exercise._id);
        setIsDeleting(false);
        handleClose();
    }

    return isDeleting ? (
        <p>Loading...</p>
    ) : (
        <li className="exercise-list-item">
            <p>{exercise.name}</p>
            <div style={{ marginLeft: "auto" }}>
                <button
                    onClick={() =>
                        setExerciseForm(prev => [
                            ...prev,
                            {
                                name: exercise.name,
                                _id: exercise._id,
                                numSets: 1,
                            },
                        ])
                    }
                    className="add-btn"
                >
                    Add
                </button>
                <button
                    onClick={e => setAnchorEl(e.target)}
                    className="edit-btn"
                >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </div>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <MenuItem
                    style={menuItemStyles}
                    className="menu-option"
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ marginRight: "10px" }}
                    />
                    Delete
                </MenuItem>
                <MenuItem
                    style={menuItemStyles}
                    className="menu-option"
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon
                        icon={faEdit}
                        style={{ marginRight: "10px" }}
                    />
                    Edit
                </MenuItem>
            </Menu>
        </li>
    );
};

export default SingleExercise;
