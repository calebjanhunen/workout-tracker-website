import React from "react";
import { nanoid } from "nanoid";

import SetForm from "./SetForm/SetForm";

const ExerciseForm = ({ setWorkoutForm, exerciseNum }) => {
    const [workoutSetComponent, setWorkoutSetComponent] = React.useState([]);
    const [numSets, setNumSets] = React.useState(0);
    // console.log(workoutForm);
    function addSet(e) {
        setNumSets(prev => prev + 1);
        e.preventDefault();
        setWorkoutSetComponent([
            ...workoutSetComponent,
            <SetForm
                key={nanoid()}
                setWorkoutForm={setWorkoutForm}
                exerciseNum={exerciseNum}
            />,
        ]);
        //TODO: add set and rep properties to form
        // setWorkoutForm(prevForm => {
        //     return {
        //         ...prevForm,
        //         [`exercise${exerciseNum}`]: {}
        //     }
        // });
    }

    function removeSet(e, set) {
        e.preventDefault();
        setWorkoutSetComponent(prevComp => {
            const index = prevComp.indexOf(set);
            console.log(index);
            const before = prevComp.slice(0, index);
            const after = prevComp.slice(index + 1);
            return before.concat(after);
        });
    }

    return (
        <div className="exercise-component">
            <input
                name="exerciseName"
                type="text"
                placeholder="Exercise Name"
                onChange={e =>
                    setWorkoutForm(prev => {
                        return {
                            ...prev,
                            // [`exercise${exerciseNum}`]: {
                            //     name: e.target.value,
                            // },
                        };
                    })
                }
            />
            {workoutSetComponent &&
                workoutSetComponent.map(comp => (
                    <div key={nanoid()} style={{ display: "flex" }}>
                        {comp}
                        <button onClick={e => removeSet(e, comp)}>
                            Remove Set
                        </button>
                    </div>
                ))}
            <button onClick={addSet}>Add Set</button>
        </div>
    );
};

export default ExerciseForm;
