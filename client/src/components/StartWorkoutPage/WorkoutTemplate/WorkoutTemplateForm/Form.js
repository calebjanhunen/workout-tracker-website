import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./FormStyles.css";
import SingleExercise from "./SingleExercise.js";

let Form = ({ showModal, exerciseForm, setExerciseForm }) => {
    const formClasses = `workout-template-form ${showModal ? "blurred" : ""}`;

    const exercisesDisplay = exerciseForm.map((exercise, index) => (
        <Draggable
            key={exercise._id}
            draggableId={`draggable-${exercise._id}`}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                            ? "0 0 0.4rem #666"
                            : "none",
                    }}
                >
                    <SingleExercise
                        exercise={exercise}
                        setExerciseForm={setExerciseForm}
                    />
                </div>
            )}
        </Draggable>
    ));

    function handleDragEnd(param) {
        const destIndex = param.destination.index;
        const sourceIndex = param.source.index;

        const tempArr = exerciseForm.slice();
        const [exerciseToMove] = tempArr.splice(sourceIndex, 1);
        tempArr.splice(destIndex, 0, exerciseToMove);

        setExerciseForm(tempArr);
    }

    return (
        <div className={formClasses}>
            <input name="workoutName" placeholder="Enter Workout Name..." />
            <DragDropContext
                onDragEnd={param => {
                    handleDragEnd(param);
                }}
            >
                <h2>Exercises:</h2>
                <Droppable droppableId="droppable-1">
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="exercises-list"
                        >
                            {exercisesDisplay}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

Form = React.memo(Form);
export default Form;
