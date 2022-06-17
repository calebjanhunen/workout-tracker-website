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

export const getWorkouts = () => async dispatch => {
    try {
        const { data } = await api.getWorkouts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err);
    }
};

export const deleteWorkout = id => async dispatch => {
    try {
        await api.deleteWorkout(id);
        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err);
    }
};

export const updateWorkout = (id, workout) => async dispatch => {
    console.log(workout);
    try {
        const { data } = await api.updateWorkout(id, workout);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
};
