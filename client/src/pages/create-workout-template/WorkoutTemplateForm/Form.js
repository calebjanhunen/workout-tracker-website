import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisH,
    faStream,
    faTimes,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem } from "@material-ui/core";

// import { useCreateWorkoutTemplateMutation } from "redux/api/workoutTrackerApi";
import { useCreateWorkoutTemplateMutation } from "redux/features/workoutTemplatesApiSlice";

import "./FormStyles.css";
import SingleExercise from "./SingleExercise.js";

let Form = ({ showModal, exerciseForm, setExerciseForm }) => {
    const formClasses = `workout-template-form ${showModal ? "blurred" : ""}`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [workoutName, setWorkoutName] = React.useState("");
    const [reorder, setReorder] = React.useState(false);
    const [createWorkoutTemplate] = useCreateWorkoutTemplateMutation();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const menuItemStyles = {
        fontSize: "12px",
    };

    //Closes more options menu
    function handleClose() {
        setAnchorEl(null);
    }

    const exercisesDisplay = exerciseForm.map((exercise, index) => {
        return reorder ? (
            <Draggable
                key={exercise._id}
                draggableId={`draggable-${exercise._id}`}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                                ? "0 0 0.4rem #666"
                                : "none",
                        }}
                    >
                        <SingleExercise
                            exercise={exercise}
                            setExerciseForm={setExerciseForm}
                            reorder={reorder}
                        />
                    </div>
                )}
            </Draggable>
        ) : (
            <SingleExercise
                key={exercise._id}
                exercise={exercise}
                setExerciseForm={setExerciseForm}
                reorder={reorder}
            />
        );
    });

    function handleDragEnd(param) {
        const destIndex = param.destination.index;
        const sourceIndex = param.source.index;

        const tempArr = exerciseForm.slice();
        const [exerciseToMove] = tempArr.splice(sourceIndex, 1);
        tempArr.splice(destIndex, 0, exerciseToMove);

        setExerciseForm(tempArr);
    }

    function handleReorderExercises() {
        setReorder(true);
        handleClose();
    }

    function handleClearTemplate() {
        setExerciseForm([]);
        setWorkoutName("");
        handleClose();
    }

    async function handleSubmitTemplate() {
        setIsSubmitting(true);
        await createWorkoutTemplate({
            workoutName,
            exercises: exerciseForm,
        });
        setIsSubmitting(false);
        handleClearTemplate();
    }

    return (
        <div className={formClasses}>
            {isSubmitting ? (
                <p>Loading</p>
            ) : (
                <>
                    <div className="workout-template__header">
                        <input
                            name="workout-template__workout-name"
                            placeholder="Enter Workout Name..."
                            onChange={e => setWorkoutName(e.target.value)}
                            value={workoutName}
                            autoComplete="off"
                        />
                        {reorder ? (
                            <button onClick={() => setReorder(false)}>
                                <FontAwesomeIcon
                                    className="workout-template__check-icon"
                                    icon={faCheck}
                                />
                            </button>
                        ) : (
                            <button onClick={e => setAnchorEl(e.target)}>
                                <FontAwesomeIcon
                                    className="workout-template__edit-icon"
                                    icon={faEllipsisH}
                                />
                            </button>
                        )}
                    </div>

                    <DragDropContext
                        onDragEnd={param => {
                            handleDragEnd(param);
                        }}
                    >
                        <Droppable droppableId="droppable-1">
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="exercises-list"
                                >
                                    {exercisesDisplay}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="workout-template__footer">
                        <button
                            onClick={handleSubmitTemplate}
                            className="finish-template-btn"
                            disabled={
                                exerciseForm.length === 0 || workoutName === ""
                                    ? true
                                    : false
                            }
                        >
                            Finish Template
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
                            onClick={handleReorderExercises}
                        >
                            <FontAwesomeIcon
                                icon={faStream}
                                style={{ marginRight: "10px" }}
                            />
                            Reorder Exercises
                        </MenuItem>
                        <MenuItem
                            style={menuItemStyles}
                            className="menu-option"
                            onClick={handleClearTemplate}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                style={{ marginRight: "12px", height: "15px" }}
                            />
                            Clear Template
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
};

Form = React.memo(Form);
export default Form;
