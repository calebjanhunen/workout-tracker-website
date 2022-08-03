import { Menu, MenuItem } from '@material-ui/core';
import { Check, Clear, MoreVert, Reorder } from '@mui/icons-material';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import SingleExercise from './components/SingleExercise/SingleExercise';
import './WorkoutForm.css';

const WorkoutForm = ({ workoutTemplate, exerciseForm, setExerciseForm }) => {
    const [workoutName, setWorkoutName] = React.useState(
        workoutTemplate ? workoutTemplate.workoutName : ''
    );
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    //For Edit Menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    //For Drag and Drop
    const [reorder, setReorder] = React.useState(false);

    const exercisesDisplay = exerciseForm ? (
        exerciseForm.map((exercise, index) => {
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
                                    ? '0 0 0.4rem #666'
                                    : 'none',
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
        })
    ) : (
        <p className="no-exercices-text">
            Add an exercise <br></br> from the Exercises list
        </p>
    );

    async function handleSubmitWorkout() {
        setIsSubmitting(true);
        setIsSubmitting(false);
        // await createWorkout({
        //     name: workoutName,
        //     createdAt: new Date(),
        //     exercises: exerciseForm,
        // });
        handleClearTemplate();
    }

    function handleClearTemplate() {
        // exerciseForm.exercises = [];
        setWorkoutName('');
        handleClose();
    }

    //Closes more options menu
    function handleClose() {
        setAnchorEl(null);
    }

    /******************Drag and Drop Functions**************** */
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

    return (
        <div className="create-workout-form">
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
                                <Check />
                            </button>
                        ) : (
                            <button onClick={e => setAnchorEl(e.target)}>
                                <MoreVert />
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
                                !exerciseForm || workoutName === ''
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
                            className="menu-option"
                            onClick={handleReorderExercises}
                        >
                            <Reorder />
                            Reorder Exercises
                        </MenuItem>
                        <MenuItem
                            className="menu-option"
                            onClick={handleClearTemplate}
                        >
                            <Clear />
                            Clear Template
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
};

export default WorkoutForm;
