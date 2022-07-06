import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { workoutTrackerApi } from "./redux/features/api/workoutTrackerApi.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            {/* <ApiProvider api={workoutTrackerApi}> */}
            <App />
            {/* </ApiProvider> */}
        </Provider>
    </BrowserRouter>
);
