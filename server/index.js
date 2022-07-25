import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import workoutRouter from "./routers/workoutRouter.js";
import exerciseRouter from "./routers/exerciseRouter.js";
import workoutTemplateRouter from "./routers/workoutTemplateRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();

//built-in middlewares
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
); //Cross Origin Resource Sharing
app.use(express.json()); //For reading json
app.use(cookieParser()); //For reading cookies (refresh token)

app.use("/workouts", workoutRouter);
app.use("/workoutTemplates", workoutTemplateRouter);
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

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
