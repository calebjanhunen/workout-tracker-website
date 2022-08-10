import React from 'react';
import { useSelector } from 'react-redux';

import '../SelectWorkoutTemplate.css';

const SingleTemplate = ({
    templateInfo,
    setMoreInfoTemplate,
    isActiveTemplate,
}) => {
    const userId = useSelector(state => state.auth.userId);
    const templateClasses = `single-template-container ${
        isActiveTemplate ? 'active-template' : ''
    }`;
    const createdBy = templateInfo.createdBy?.username;

    return (
        <div
            className={templateClasses}
            onClick={() => setMoreInfoTemplate(templateInfo)}
        >
            <div className="template-info">
                <h3 className="workout-name">{templateInfo.workoutName}</h3>
                <p className="createdBy">
                    {templateInfo.createdBy?._id === userId ? 'You' : createdBy}
                </p>
            </div>
            <p className="num-exercises">
                {templateInfo.exercises.length} exercises
            </p>
        </div>
    );
};

export default SingleTemplate;
