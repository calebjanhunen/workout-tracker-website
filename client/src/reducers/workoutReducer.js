import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes.js";

export default function workoutReducer(workouts = [], action) {
    switch (action.type) {
        case CREATE:
            return [...workouts, action.payload];
        case FETCH_ALL:
            return action.payload;
        case DELETE:
            return workouts.filter(workout => workout._id !== action.payload);
        default:
            return workouts;
    }
}
