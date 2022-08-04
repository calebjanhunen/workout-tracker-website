import React from 'react';
import { useSelector } from 'react-redux';

import './CreateWorkoutFormStyles.css';

import ExerciseList from 'components/ExerciseList/ExerciseList';
import WorkoutForm from 'components/WorkoutForm/WorkoutForm';

const CreateWorkoutForm = () => {
    const workoutTemplate = useSelector(state => state.workoutTemplate.value);
    const [exerciseForm, setExerciseForm] = React.useState(
        Object.keys(workoutTemplate).length !== 0
            ? workoutTemplate.exercises
            : []
    );
    const templateOrWorkout = 'workout';

    return (
        <div className="create-workout-form-container">
            <WorkoutForm
                workoutTemplate={workoutTemplate}
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
                templateOrWorkout={templateOrWorkout}
            />
            <ExerciseList
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
            />
        </div>
    );
};

export default CreateWorkoutForm;
