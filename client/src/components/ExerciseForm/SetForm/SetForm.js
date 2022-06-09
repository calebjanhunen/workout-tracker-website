import React from "react";
import "./SetFormStyles.css";

const SetForm = ({ setExerciseInfo }) => {
    return (
        <div>
            <input
                type="Number"
                name="reps"
                placeholder="Reps"
                onChange={e =>
                    setExerciseInfo(prev => {
                        //TODO: get index from ExerciseModal to change correct object value
                        return prev.map((eachSet, index) => {
                            if (index === 0) {
                                eachSet.reps = e.target.value;
                            }
                            return eachSet;
                        });
                    })
                }
            />
            <input type="Number" name="weight" placeholder="Weight" />
        </div>
    );
};

export default SetForm;
