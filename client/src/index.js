import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import "./index.css";
import App from "./App";
import { workoutTrackerApi } from "./redux/features/api/workoutTrackerApi.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ApiProvider api={workoutTrackerApi}>
            <App />
        </ApiProvider>
    </BrowserRouter>
);
