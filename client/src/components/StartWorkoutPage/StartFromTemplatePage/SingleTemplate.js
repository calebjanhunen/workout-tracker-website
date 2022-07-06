import React from "react";

import "./StartFromTemplateStyles.css";

const SingleTemplate = ({
    templateInfo,
    setMoreInfoTemplate,
    isActiveTemplate,
}) => {
    const templateClasses = `single-template-container ${
        isActiveTemplate ? "active-template" : ""
    }`;

    return (
        <div
            className={templateClasses}
            onClick={() => setMoreInfoTemplate(templateInfo)}
        >
            <h3 className="workout-name">{templateInfo.workoutName}</h3>
            <p className="num-exercises">
                {templateInfo.exercises.length} exercises
            </p>
        </div>
    );
};

export default SingleTemplate;
