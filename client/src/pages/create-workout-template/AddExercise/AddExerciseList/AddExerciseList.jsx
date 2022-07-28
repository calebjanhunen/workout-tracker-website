import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./AddExerciseStyles.css";
// import {
//     useGetExercisesQuery,
//     useGetExercisesByQueryQuery,
// } from "redux/api/workoutTrackerApi";
import {
    useGetExercisesQuery,
    useGetExercisesByQueryQuery,
} from "redux/features/exercisesApiSlice";
import SingleExercise from "./SingleExercise";

const AddExerciseList = ({ showModal, setShowModal, setExerciseForm }) => {
    const [pageNum, setPageNum] = React.useState(1);
    const [resultsPerPage, setResutsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [bodyPartFilter, setBodyPartFilter] =
        React.useState("All body parts");
    const { data: allExercises } = useGetExercisesQuery();
    const {
        data: exercisesByPage,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetExercisesByQueryQuery({
        pageNum,
        resultsPerPage,
        bodyPartFilter,
    });

    let exercisesDisplay;
    if (isLoading || isFetching) {
        exercisesDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        if (searchTerm) {
            const matchingExercises = allExercises.filter(exercise =>
                exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            exercisesDisplay = matchingExercises.map(exercise => (
                <SingleExercise
                    key={exercise._id}
                    exercise={exercise}
                    setExerciseForm={setExerciseForm}
                />
            ));
        } else {
            exercisesDisplay = exercisesByPage.map(exercise => (
                <SingleExercise
                    key={exercise._id}
                    exercise={exercise}
                    setExerciseForm={setExerciseForm}
                />
            ));
        }
    }

    const maxNumPages = Math.ceil(allExercises?.length / resultsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= maxNumPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div
                className={`add-exercise-container ${
                    showModal ? "blurred" : ""
                }`}
                style={{ maxHeight: `${167.6 + resultsPerPage * 50}px` }}
            >
                <div className="add-exercise-content">
                    <h1 className="add-exercise-title">Exercises</h1>
                    <div className="search-queries">
                        <input
                            name="search-exercise"
                            placeholder="Search For Exercise"
                            //TODO: make it so you can search while filtering (rn shows nothing)
                            onChange={e => setSearchTerm(e.target.value)}
                            autoComplete="off"
                        />
                        <div className="body-part-search-filter">
                            <label htmlFor="body-part">Filter body part:</label>
                            <select
                                name="body part"
                                id="body-part"
                                onChange={e => {
                                    setBodyPartFilter(e.target.value);
                                }}
                                defaultValue="All body parts"
                            >
                                <option value="All body parts">
                                    All body parts
                                </option>
                                <option>Arms</option>
                                <option>Shoulders</option>
                                <option>Chest</option>
                                <option>Back</option>
                                <option>Core</option>
                                <option>Legs</option>
                            </select>
                        </div>
                    </div>
                    <button
                        className="create-exercise-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Create Exercise
                    </button>
                    <ul>{exercisesDisplay}</ul>
                </div>
                <div className="add-exercise-footer">
                    <button
                        className="page-btn-left"
                        onClick={() => setPageNum(prev => prev - 1)}
                        disabled={pageNum === 1 ? true : false}
                    >
                        <FontAwesomeIcon
                            className="change-page-icon"
                            icon={faArrowLeft}
                        />
                    </button>
                    <div className="page-numbers">
                        {pageNumbers.map(page => (
                            <button
                                key={page}
                                className={
                                    page === pageNum ? "active-page" : ""
                                }
                                onClick={() => setPageNum(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        className="page-btn-right"
                        onClick={() => setPageNum(prev => prev + 1)}
                        disabled={maxNumPages === pageNum ? true : false}
                    >
                        <FontAwesomeIcon
                            className="change-page-icon"
                            icon={faArrowRight}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddExerciseList;
