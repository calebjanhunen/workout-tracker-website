import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import workoutRouter from "./routers/workoutRouter.js";
import exerciseRouter from "./routers/exerciseRouter.js";
import workoutTemplateRouter from "./routers/workoutTemplateRouter.js";

const app = express();

app.use(cors());

app.use("/workouts", workoutRouter);
app.use("/workoutTemplates", workoutTemplateRouter);
app.use("/exercises", exerciseRouter);

app.get("/", (req, res) => {
    res.send("Welcome to workout tracker api");
});

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(process.env.PORT, () =>
            console.log(`Server is up on port: ${process.env.PORT}`)
        )
    )
    .catch(err => console.log(err));
