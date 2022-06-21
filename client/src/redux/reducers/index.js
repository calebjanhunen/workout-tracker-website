import { combineReducers } from "redux";

import workoutReducer from "./workoutReducer";
import loadingReducer from "./loadingReducer";

const allReducers = combineReducers({
    workoutReducer,
    loadingReducer,
});

export default allReducers;
