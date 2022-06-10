import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes.js";
import * as api from "../api/apiCalls.js";

export const createWorkout = newWorkout => async dispatch => {
    try {
        const { data } = await api.createWorkout(newWorkout);
        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err);
    }
};
