import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import workoutRouter from "./routers/workoutRouter.js";

const app = express();

app.use(cors());

app.use("/workouts", workoutRouter);

app.get("/", (req, res) => {
    res.send("hey");
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
