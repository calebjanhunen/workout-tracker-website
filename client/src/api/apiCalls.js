import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export function createWorkout(newWorkout) {
    return API.post("/workouts", newWorkout);
}

export function getWorkouts() {
    return API.get("/workouts");
}
