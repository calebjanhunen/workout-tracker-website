import moment from 'moment';
import React from 'react';

import './WorkoutInfoDisplay.css';

import { useUpdateWorkoutMutation } from 'redux/features/workoutsApiSlice';

const WorkoutCardInfo = ({ workoutInfo, setShowEditForm }) => {
    const [showWorkoutInfo, setShowWorkoutInfo] = React.useState(false);
    const [updateWorkout] = useUpdateWorkoutMutation();

    async function handleToggleShare(isShared) {
        isShared
            ? await updateWorkout({ ...workoutInfo, public: false })
            : await updateWorkout({
                  ...workoutInfo,
                  public: true,
                  sharedAt: Date.now(),
              });
    }

    function displayWorkoutInfo() {
        return (
            <div className="workout-card__more-info">
                {workoutInfo.exercises.map((exercise, index) => (
                    <div key={index} className="exercise">
                        <h3
                            className="exercise-name"
                            style={{ marginTop: '10px' }}
                        >
                            {exercise.name}
                        </h3>
                        {exercise.sets.map((info, index) => (
                            <div key={index} className="exercise-info">
                                <p
                                    className="exercise-info__set"
                                    style={{ marginRight: '10px' }}
                                >
                                    Set {index + 1}
                                </p>
                                <p
                                    className="exercise-info__weight"
                                    style={{ marginRight: '10px' }}
                                >
                                    {info.weight} lbs
                                </p>
                                <p className="exercise-info__reps">
                                    {info.reps} reps
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            onClick={e => {
                if (
                    e.target.parentElement.className !== 'delete-btn' &&
                    e.target.parentElement.className !==
                        'delete-workout-confirmation' &&
                    e.target.parentElement.className !== 'edit-btn'
                )
                    setShowWorkoutInfo(prev => !prev);
            }}
            className="workout-card"
        >
            <div className="workout-card__header">
                <h1 className="workout-card__title">{workoutInfo.name}</h1>
                <button
                    className="edit-btn"
                    onClick={() => setShowEditForm(prev => !prev)}
                >
                    Edit
                </button>
                {workoutInfo.public ? (
                    <button
                        onClick={() => handleToggleShare(workoutInfo.public)}
                    >
                        Hide
                    </button>
                ) : (
                    <button
                        onClick={() => handleToggleShare(workoutInfo.public)}
                    >
                        Share
                    </button>
                )}
            </div>
            <div className="workout-card__time-values">
                <h2 className="time-values__date">
                    {moment(workoutInfo.createdAt).format('MMM DD')}
                </h2>
                <h2 className="time-values__workout-length">Workout Length</h2>
            </div>
            <div className="workout-card__workout-info">
                {showWorkoutInfo ? (
                    displayWorkoutInfo()
                ) : (
                    <h2 className="exercises__num-exercises">
                        {workoutInfo.exercises.length > 1
                            ? `${workoutInfo.exercises.length} Exercises`
                            : `${workoutInfo.exercises.length} Exercise`}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default WorkoutCardInfo;
