import React from "react";

import "./WorkoutTemplateStyles.css";
import Form from "./WorkoutTemplateForm/Form";
import AddExerciseList from "./AddExercise/AddExerciseList/AddExerciseList";
import CreateExerciseModal from "./AddExercise/CreateExerciseModal/CreateExerciseModal";

const WorkoutTemplate = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [exerciseForm, setExerciseForm] = React.useState([]);

    //Closes create exercise when click outside modal
    React.useEffect(() => {
        function closeModal(e) {
            if (
                !e.target.parentElement?.className.includes(
                    "create-exercise-modal"
                )
            )
                setShowModal(false);
        }
        if (showModal === true) {
            document.addEventListener("mousedown", closeModal);
        }
        return () => document.removeEventListener("mousedown", closeModal);
    });

    return (
        <div className="workout-template-page">
            <Form
                showModal={showModal}
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
            />
            <AddExerciseList
                showModal={showModal}
                setShowModal={setShowModal}
                setExerciseForm={setExerciseForm}
            />
            {showModal && <CreateExerciseModal setShowModal={setShowModal} />}
        </div>
    );
};

export default WorkoutTemplate;
