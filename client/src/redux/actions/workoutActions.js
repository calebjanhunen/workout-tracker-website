import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes.js";
import * as api from "../../api/apiCalls.js";

import { setLoadingFalse, setLoadingTrue } from "./loadingActions.js";

export const createWorkout = newWorkout => async dispatch => {
    dispatch(setLoadingTrue());
    try {
        const { data } = await api.createWorkout(newWorkout);
        dispatch(setLoadingFalse());
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
    dispatch(setLoadingTrue());
    try {
        await api.deleteWorkout(id);
        dispatch(setLoadingFalse());
        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err);
    }
};

export const updateWorkout = (id, workout) => async dispatch => {
    // console.log(workout);
    dispatch(setLoadingTrue());
    try {
        const { data } = await api.updateWorkout(id, workout);
        dispatch(getWorkouts());
        dispatch({ type: UPDATE, payload: data });
        dispatch(setLoadingFalse());
    } catch (err) {
        console.log(err);
    }
};
