import { combineReducers } from "redux";

import workoutReducer from "./workoutReducer";

const allReducers = combineReducers({
    workoutReducer,
});

export default allReducers;
