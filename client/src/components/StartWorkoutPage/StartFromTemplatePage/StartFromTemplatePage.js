import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./StartFromTemplateStyles.css";
import SingleTemplate from "./SingleTemplate";
import { useGetWorkoutTemplatesQuery } from "../../../redux/features/api/workoutTrackerApi";
import { setWorkoutTemplate } from "../../../redux/reducer/workoutTemplateSlice";

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
            <div className="more-info-header">
                <button
                    className="use-template-btn"
                    onClick={() => {
                        dispatch(setWorkoutTemplate(moreInfoTemplate));
                        navigate("/start-workout/create-workout-form");
                    }}
                >
                    Use Template
                </button>
            </div>
            <div className="more-info-body">
                <h3>{moreInfoTemplate.workoutName}</h3>
                <ul className="exercise-list">
                    {moreInfoTemplate.exercises.map(exercise => (
                        <li key={exercise._id}>
                            {exercise.name} ({exercise.numSets}{" "}
                            {exercise.numSets > 1 ? "sets" : "set"})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <p style={{ textAlign: "center" }}>
            Click an exercise to <br></br> view more info
        </p>
    );

    return (
        <div className="start-from-template-page">
            <div className="templates-list">
                <h1>Select Template:</h1>
                <div className="workout-templates">{templateListDisplay}</div>
            </div>
            <div className="more-info-container">{moreInfoDisplay}</div>
        </div>
    );
};

export default StartFromTemplatePage;
