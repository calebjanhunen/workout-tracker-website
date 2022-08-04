import React from 'react';

import ExerciseList from 'components/ExerciseList/ExerciseList';
import WorkoutForm from 'components/WorkoutForm/WorkoutForm';
import './WorkoutTemplateStyles.css';

const WorkoutTemplate = () => {
    const [exerciseForm, setExerciseForm] = React.useState([]);
    const templateOrWorkout = 'template';

    return (
        <div className="workout-template-page">
            <WorkoutForm
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

export default WorkoutTemplate;
