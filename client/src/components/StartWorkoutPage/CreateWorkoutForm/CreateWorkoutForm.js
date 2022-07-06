import React from "react";

import "./CreateWorkoutFormStyles.css";

import Form from "./Form/Form";
import AddExerciseList from "./AddExercise/AddExerciseList/AddExerciseList";
import CreateExerciseModal from "./AddExercise/CreateExerciseModal/CreateExerciseModal";

const CreateWorkoutForm = () => {
    return (
        <div className="create-workout-form-container">
            <Form />
            <AddExerciseList />
        </div>
    );
};

export default CreateWorkoutForm;
