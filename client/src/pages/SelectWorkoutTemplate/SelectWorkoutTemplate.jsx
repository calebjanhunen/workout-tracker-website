import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SingleTemplate from './components/SingleTemplate';
import './SelectWorkoutTemplate.css';

import { useGetWorkoutTemplatesQuery } from 'redux/features/workoutTemplatesApiSlice';
import { setWorkoutTemplate } from 'redux/reducer/workoutTemplateSlice';

const StartFromTemplatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        data: workoutTemplates,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetWorkoutTemplatesQuery();
    const [moreInfoTemplate, setMoreInfoTemplate] = React.useState();

    function handleStartEmptyWorkout() {
        dispatch(setWorkoutTemplate({}));
        navigate('/select-workout-template/create-workout-form');
    }

    function handleStartWorkoutWithTemplate() {
        dispatch(setWorkoutTemplate(moreInfoTemplate));
        navigate('/select-workout-template/create-workout-form');
    }

    let templateListDisplay;
    if (isLoading || isFetching) {
        templateListDisplay = <p>Loading...</p>;
    } else {
        templateListDisplay = workoutTemplates.map(template => {
            const isActiveTemplate =
                template._id === moreInfoTemplate?._id ? true : false;

            return (
                <SingleTemplate
                    key={template._id}
                    templateInfo={template}
                    setMoreInfoTemplate={setMoreInfoTemplate}
                    isActiveTemplate={isActiveTemplate}
                />
            );
        });
    }

    const moreInfoDisplay = moreInfoTemplate ? (
        <div key={moreInfoTemplate._id}>
            <div className="more-info-body">
                <h3>{moreInfoTemplate.workoutName}</h3>
                <ul className="exercise-list">
                    {moreInfoTemplate.exercises.map(exercise => (
                        <li key={exercise._id}>
                            {exercise.name} ({exercise.sets.length}{' '}
                            {exercise.sets.length > 1 ? 'sets' : 'set'})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <p style={{ textAlign: 'center' }}>
            Click a template to <br></br> view more info
        </p>
    );

    return (
        <div className="start-from-template-page">
            <div className="start-workout-buttons">
                <button onClick={handleStartEmptyWorkout}>
                    Start Empty Workout
                </button>
                <button
                    disabled={!moreInfoTemplate ? true : false}
                    onClick={handleStartWorkoutWithTemplate}
                >
                    Use {moreInfoTemplate?.workoutName} template
                </button>
            </div>
            <div className="templates-container">
                <div className="templates-list">
                    <h1>Select Template:</h1>
                    <div className="workout-templates">
                        {templateListDisplay}
                    </div>
                </div>
                <div className="more-info-container">{moreInfoDisplay}</div>
            </div>
        </div>
    );
};

export default StartFromTemplatePage;
