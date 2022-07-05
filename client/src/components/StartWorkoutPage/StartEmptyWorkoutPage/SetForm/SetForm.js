import React from "react";
import "./SetFormStyles.css";

const SetForm = ({
    id,
    setExerciseInfo,
    defaultRepsVal = undefined,
    defaultWeightVal = undefined,
}) => {
    function inputSetInfo(e, category) {
        setExerciseInfo(prev => {
            return prev.map(eachSet => {
                if (eachSet.id === id) {
                    eachSet[category] = e.target.value;
                }
                return eachSet;
            });
        });
    }

    return (
        <div>
            <input
                defaultValue={defaultRepsVal ? defaultRepsVal : ""}
                type="Number"
                name="reps"
                placeholder="Reps"
                onChange={e => inputSetInfo(e, "reps")}
            />
            <input
                defaultValue={defaultWeightVal ? defaultWeightVal : ""}
                type="Number"
                name="weight"
                placeholder="Weight"
                onChange={e => inputSetInfo(e, "weight")}
            />
        </div>
    );
};

export default SetForm;
