import React from 'react';

import '../SelectWorkoutTemplate.css';

const SingleTemplate = ({
    templateInfo,
    setMoreInfoTemplate,
    isActiveTemplate,
}) => {
    const templateClasses = `single-template-container ${
        isActiveTemplate ? 'active-template' : ''
    }`;

    return (
        <div
            className={templateClasses}
            onClick={() => setMoreInfoTemplate(templateInfo)}
        >
            <div className="template-info">
                <h3 className="workout-name">{templateInfo.workoutName}</h3>
                <p className="createdBy">{templateInfo.createdBy?.username}</p>
            </div>
            <p className="num-exercises">
                {templateInfo.exercises.length} exercises
            </p>
        </div>
    );
};

export default SingleTemplate;
