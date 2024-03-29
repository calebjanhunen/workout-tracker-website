import { Check, MoreVert } from '@mui/icons-material';
import React, { createRef, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import './WorkoutForm.css';

import { useUpdateExerciseMutation } from 'redux/features/exercisesApiSlice';
import { useCreateWorkoutMutation } from 'redux/features/workoutsApiSlice';
import { useCreateWorkoutTemplateMutation } from 'redux/features/workoutTemplatesApiSlice';
import EditMenu from './components/EditMenu/EditMenu';
import SingleExercise from './components/SingleExercise/SingleExercise';

const WorkoutForm = ({
    workoutTemplate,
    exerciseForm,
    setExerciseForm,
    templateOrWorkout,
}) => {
    const userId = useSelector(state => state.auth.userId);
    const [workoutName, setWorkoutName] = React.useState(
        workoutTemplate ? workoutTemplate.workoutName : ''
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); //For Edit Menu
    const [reorder, setReorder] = useState(false); //For Drag and Drop
    const [updateExercise] = useUpdateExerciseMutation();
    const [createWorkout] = useCreateWorkoutMutation();
    const [createWorkoutTemplate] = useCreateWorkoutTemplateMutation();
    const bottomRef = createRef();
    const [exerciseIdChanged, setExerciseIdChanged] = useState('');

    //Scroll to bottom if new exercise is added or set is added to last exercise
    useEffect(() => {
        if (exerciseForm[exerciseForm.length - 1]?._id === exerciseIdChanged)
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

        setExerciseIdChanged('');
    }, [exerciseForm, exerciseIdChanged, bottomRef]);

    async function handleSubmitWorkout() {
        setIsSubmitting(true);
        if (templateOrWorkout === 'workout') {
            exerciseForm.forEach(async exercise => {
                await updateExercise({ sets: exercise.sets, id: exercise._id });
            });
            await createWorkout({
                name: workoutName,
                exercises: exerciseForm,
            });
        } else if (templateOrWorkout === 'template') {
            await createWorkoutTemplate({
                workoutName,
                exercises: exerciseForm,
                createdBy: userId,
            });
        }
        setIsSubmitting(false);
        handleClearTemplate();
    }

    function handleClearTemplate() {
        setWorkoutName('');
        setExerciseForm([]);
        setAnchorEl(null);
    }

    function handleDragEnd(param) {
        const destIndex = param.destination.index;
        const sourceIndex = param.source.index;

        const tempArr = exerciseForm.slice();
        const [exerciseToMove] = tempArr.splice(sourceIndex, 1);
        tempArr.splice(destIndex, 0, exerciseToMove);

        setExerciseForm(tempArr);
    }

    const exercisesDisplay =
        exerciseForm?.length > 0 ? (
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
                                    templateOrWorkout={templateOrWorkout}
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
                        templateOrWorkout={templateOrWorkout}
                        setExerciseIdChanged={setExerciseIdChanged}
                    />
                );
            })
        ) : (
            <p className="no-exercices-text">
                Add an exercise <br></br> from the Exercises list
            </p>
        );

    return (
        <div className="create-workout-form">
            {isSubmitting ? (
                <p>Loading</p>
            ) : (
                <>
                    {/*Workout Form Header*/}
                    <div className="create-workout-form__header">
                        <input
                            name="create-workout-form__workout-name"
                            placeholder="Enter Workout Name..."
                            onChange={e => setWorkoutName(e.target.value)}
                            defaultValue={workoutTemplate ? workoutName : ''}
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

                    {/*Exercise List*/}
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
                        <div ref={bottomRef} />
                    </div>

                    {/*Workout Form Footer*/}
                    <div className="create-workout-form__footer">
                        <button
                            onClick={handleSubmitWorkout}
                            className="finish-template-btn"
                            disabled={
                                exerciseForm?.length === 0 || workoutName === ''
                                    ? true
                                    : false
                            }
                        >
                            Finish
                            {templateOrWorkout === 'workout'
                                ? ' Workout'
                                : ' Template'}
                        </button>
                    </div>
                    <EditMenu
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        setReorder={setReorder}
                        handleClearTemplate={handleClearTemplate}
                    />
                </>
            )}
        </div>
    );
};

export default WorkoutForm;
