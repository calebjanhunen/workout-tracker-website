import React from 'react';

import ExerciseList from 'components/ExerciseList/ExerciseList';
import WorkoutForm from 'components/WorkoutForm/WorkoutForm';
import './WorkoutTemplateStyles.css';

const WorkoutTemplate = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [exerciseForm, setExerciseForm] = React.useState([]);

    //Closes create exercise when click outside modal
    React.useEffect(() => {
        function closeModal(e) {
            if (
                !e.target.parentElement?.className.includes(
                    'create-exercise-modal'
                )
            )
                setShowModal(false);
        }
        if (showModal === true) {
            document.addEventListener('mousedown', closeModal);
        }
        return () => document.removeEventListener('mousedown', closeModal);
    });

    return (
        <div className="workout-template-page">
            <WorkoutForm
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
            />
            <ExerciseList
                exerciseForm={exerciseForm}
                setExerciseForm={setExerciseForm}
            />
            {/* {showModal && <CreateExerciseModal setShowModal={setShowModal} />} */}
        </div>
    );
};

export default WorkoutTemplate;
