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

import { useCreateWorkoutMutation } from "../../../../redux/features/api/workoutTrackerApi";

import "./FormStyles.css";

import SingleExercise from "./SingleExercise";

const CreateWorkoutForm = ({
    exerciseForm,
    setExerciseForm,
    workoutTemplate,
}) => {
    const showModal = false;
    const formClasses = `create-workout-form ${showModal ? "blurred" : ""}`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [workoutName, setWorkoutName] = React.useState(
        workoutTemplate.workoutName
    );
    const [reorder, setReorder] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [createWorkout] = useCreateWorkoutMutation();

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
        // exerciseForm.exercises = [];
        setWorkoutName("");
        handleClose();
    }

    async function handleSubmitWorkout() {
        setIsSubmitting(true);
        setIsSubmitting(false);
        await createWorkout({
            name: workoutName,
            createdAt: new Date(),
            exercises: exerciseForm,
        });
        handleClearTemplate();
    }

    return (
        <div className={formClasses}>
            {isSubmitting ? (
                <p>Loading</p>
            ) : (
                <>
                    <div className="create-workout-form__header">
                        <input
                            name="create-workout-form__workout-name"
                            placeholder="Enter Workout Name..."
                            onChange={e => setWorkoutName(e.target.value)}
                            value={workoutName}
                            autoComplete="off"
                        />
                        {reorder ? (
                            <button onClick={() => setReorder(false)}>
                                <FontAwesomeIcon
                                    className="create-workout-form__check-icon"
                                    icon={faCheck}
                                />
                            </button>
                        ) : (
                            <button onClick={e => setAnchorEl(e.target)}>
                                <FontAwesomeIcon
                                    className="create-workout-form__edit-icon"
                                    icon={faEllipsisH}
                                />
                            </button>
                        )}
                    </div>

                    <div className="workout-form_exercises-list">
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
                                    >
                                        {exercisesDisplay}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="create-workout-form__footer">
                        <button
                            onClick={handleSubmitWorkout}
                            className="finish-template-btn"
                            disabled={
                                exerciseForm.length === 0 || workoutName === ""
                                    ? true
                                    : false
                            }
                        >
                            Finish Workout
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

export default CreateWorkoutForm;
