import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import workoutRouter from "./routers/workoutRouter.js";
import exerciseRouter from "./routers/exerciseRouter.js";
import workoutTemplateRouter from "./routers/workoutTemplateRouter.js";
import userRouter from "./routers/userRouter.js";
import { corsOptions } from "./utils/corsOptions.js";
import { credentials } from "./middleware/credentials.js";

const app = express();

//CUSTOM MIDDLEWARE
//sets credentials to true if origin is included in allowedOrigins
app.use(credentials);

//BUILT IN MIDDLEWARE
//Cross Origin Resource Sharing: sets origin to front-end domain (localhost or netlify)
app.use(cors(corsOptions));

//For reading json
app.use(express.json());

//For reading cookies (refresh token)
app.use(cookieParser());

app.use("/workouts", workoutRouter);
app.use("/workoutTemplates", workoutTemplateRouter);
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Workout Tracker Api");
});

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(process.env.PORT, () =>
            console.log(`Server is up on port: ${process.env.PORT}`)
        )
    )
    .catch(err => console.log(err));
