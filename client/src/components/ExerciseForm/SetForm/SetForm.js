import React from "react";
import "./SetFormStyles.css";

const SetForm = () => {
    return (
        <div className="set-component">
            <input name="reps" type="number" placeholder="Reps" />
            <input name="weight" type="number" placeholder="Weight" />
        </div>
    );
};

export default SetForm;
