import React from 'react';
import { useSelector } from 'react-redux';

import './CreateWorkoutFormStyles.css';

import ExerciseList from 'components/ExerciseList/ExerciseList';
import WorkoutForm from 'components/WorkoutForm/WorkoutForm';

const CreateWorkoutForm = () => {
    const workoutTemplate = useSelector(state => state.workoutTemplate.value);
    const [exerciseForm, setExerciseForm] = React.useState(
        workoutTemplate.exercises
    );

    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className="create-workout-form-container">
            <WorkoutForm
                workoutTemplate={workoutTemplate}
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
            />
            <ExerciseList
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            {/* {showModal && <CreateExerciseModal setShowModal={setShowModal} />} */}
        </div>
    );
};

export default CreateWorkoutForm;
