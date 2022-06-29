import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./AddExerciseStyles.css";
import {
    useGetExercisesQuery,
    useGetExercisesByPageQuery,
} from "../../../../../redux/features/api/exercisesApi";
import SingleExercise from "./SingleExercise";

const AddExerciseList = ({ showModal, setShowModal }) => {
    const [pageNum, setPageNum] = React.useState(1);
    const [resultsPerPage, setResutsPerPage] = React.useState(5);
    const { data: allExercises } = useGetExercisesQuery();
    const {
        data: exercisesByPage,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetExercisesByPageQuery({ pageNum, resultsPerPage });

    let exercisesDisplay;
    if (isLoading || isFetching) {
        exercisesDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        exercisesDisplay = exercisesByPage.map(exercise => (
            <SingleExercise key={exercise._id} exercise={exercise} />
        ));
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
            >
                <div className="add-exercise-content">
                    <h1 className="add-exercise-title">Exercises</h1>
                    <input
                        name="search-exercise"
                        placeholder="Search For Exercise"
                    />
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
