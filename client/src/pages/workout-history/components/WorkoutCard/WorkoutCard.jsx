import {
    Card,
    Typography,
    CardHeader,
    CardContent,
    IconButton,
    Box,
    CardActions,
} from "@material-ui/core";
import { MoreVert, Share } from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { useState } from "react";

import styles from "./WorkoutCard.module.css";

const WorkoutCard = ({ workoutInfo }) => {
    const [showWorkoutInfo, setShowWorkoutInfo] = useState(false);
    console.log(workoutInfo);
    return (
        <Card className={styles.workoutCard} raised>
            <CardHeader
                className={styles.cardHeader}
                title={workoutInfo.name}
                action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                }
            />
            <CardContent className={styles.cardContent}>
                <Box component="div">
                    <Typography className={styles.workoutDate} variant="h6">
                        {moment(workoutInfo.createdAt).format("MMM DD")}
                    </Typography>
                    <Typography className={styles.workoutLength} variant="h6">
                        1hr 45min
                    </Typography>
                </Box>
                {showWorkoutInfo ? (
                    <Typography>workout info</Typography>
                ) : (
                    <Typography variant="subtitle1">
                        {workoutInfo.exercises.length} Exercises
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <IconButton>
                    <Share />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default WorkoutCard;
