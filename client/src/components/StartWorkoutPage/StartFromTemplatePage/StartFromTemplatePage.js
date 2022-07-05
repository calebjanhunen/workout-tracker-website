import React from "react";
import { useNavigate } from "react-router-dom";

import "./StartFromTemplateStyles.css";
import SingleTemplate from "./SingleTemplate";
import { useGetWorkoutTemplatesQuery } from "../../../redux/features/api/workoutTrackerApi";

const StartFromTemplatePage = () => {
    const navigate = useNavigate();
    const {
        data: workoutTemplates,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetWorkoutTemplatesQuery();

    let templateDisplay;
    if (isLoading || isFetching) {
        templateDisplay = <p>Loading...</p>;
    } else {
        templateDisplay = workoutTemplates.map(template => (
            <SingleTemplate key={template._id} templateInfo={template} />
        ));
    }

    return (
        <div className="start-from-template-page">
            {/* <button
                className="back-btn"
                onClick={() => navigate("/start-workout")}
            >
                Back
            </button> */}
            <div className="template-page__content">
                <h1>Select Template:</h1>
                <div className="workout-templates">{templateDisplay}</div>
            </div>
        </div>
    );
};

export default StartFromTemplatePage;
