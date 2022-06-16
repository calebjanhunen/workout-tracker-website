import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export function createWorkout(newWorkout) {
    return API.post("/workouts", newWorkout);
}

export function getWorkouts() {
    return API.get("/workouts");
}

export function deleteWorkout(id) {
    return API.delete(`/workouts/${id}`);
}

export function updateWorkout(id, workout) {
    return API.patch(`/workouts/${id}`, workout);
}
