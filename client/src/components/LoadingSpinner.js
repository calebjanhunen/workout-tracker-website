import React from "react";

import loadingSpinnerImg from "../images/Spinner-1s-200px.gif";

const LoadingSpinner = ({ loadingSpinnerClass }) => {
    return (
        <div className={loadingSpinnerClass}>
            <img
                className="loading-spinner"
                src={loadingSpinnerImg}
                alt="Loading Spinner"
            />
        </div>
    );
};

export default LoadingSpinner;
