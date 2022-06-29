import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import "./index.css";
import App from "./App";
import { workoutsApi } from "./redux/features/api/workoutsApi.js";
import { exercisesApi } from "./redux/features/api/exercisesApi.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ApiProvider api={workoutsApi}>
            <ApiProvider api={exercisesApi}>
                <App />
            </ApiProvider>
        </ApiProvider>
    </BrowserRouter>
);
