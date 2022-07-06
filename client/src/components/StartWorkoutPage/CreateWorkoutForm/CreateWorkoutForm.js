import React from "react";
import { useSelector } from "react-redux";

const CreateWorkoutForm = () => {
    const workoutTemplate = useSelector(state => state.workoutTemplate.value);
    console.log(workoutTemplate);
    return <div>CreateWorkoutForm</div>;
};

export default CreateWorkoutForm;
