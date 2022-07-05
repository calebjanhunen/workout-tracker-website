import React from "react";

import "./StartFromTemplateStyles.css";

const SingleTemplate = ({ templateInfo }) => {
    console.log(templateInfo);
    return (
        <div className="single-template-container">
            <h3>{templateInfo.workoutName}</h3>
        </div>
    );
};

export default SingleTemplate;
