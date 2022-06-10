import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes.js";

export default function workoutReducer(workouts = [], action) {
    switch (action.type) {
        case CREATE:
            return [...workouts, action.payload];
        default:
            return workouts;
    }
}
