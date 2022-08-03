import React from 'react';
import { useSelector } from 'react-redux';

import './CreateWorkoutFormStyles.css';

import ExerciseList from 'components/ExerciseList/ExerciseList';
import Form from './Form/Form';

const CreateWorkoutForm = () => {
    const workoutTemplate = useSelector(state => state.workoutTemplate.value);
    const [exerciseForm, setExerciseForm] = React.useState(
        workoutTemplate.exercises
    );
    const [showModal, setShowModal] = React.useState(false);
    return (
        <div className="create-workout-form-container">
            <Form
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
                workoutTemplate={workoutTemplate}
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
