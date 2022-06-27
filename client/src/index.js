import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import "./index.css";
import App from "./App";
// import { store } from "./redux/store";
import { workoutsApi } from "./redux/features/api/workoutsApi.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        {/* <Provider store={store}> */}
        <ApiProvider api={workoutsApi}>
            <App />
        </ApiProvider>
        {/* </Provider> */}
    </BrowserRouter>
);
