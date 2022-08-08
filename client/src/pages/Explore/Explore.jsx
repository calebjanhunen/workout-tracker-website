import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
} from '@material-ui/core';
import { Favorite, MoreVert } from '@mui/icons-material';
import React from 'react';

import styles from './Explore.module.css';

import { useGetWorkoutsQuery } from 'redux/features/workoutsApiSlice';

//Explore Page Ideas:
//  - A feed with shared workouts from other users
//  - Ability to save other users workouts as templates
//  - Ability to like user's workouts
//  - Ability to comment?

const Explore = () => {
    const {
        data: sharedWorkouts,
        isLoading,
        isSuccess,
        isError,
    } = useGetWorkoutsQuery(true);

    if (isSuccess) {
        console.log(sharedWorkouts);
    }

    return (
        <div className={styles.explorePageContainer}>
            <div className={styles.workoutFeedContainer}>
                <Card className={styles.workoutPost} elevation={10}>
                    <CardHeader
                        avatar={<Avatar>C</Avatar>}
                        action={
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        }
                        title="calebj1"
                        subheader="6 min ago"
                    />
                    <CardContent>
                        <h2>Push 1</h2>
                        <h4>Dumbbell Bench</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Set</th>
                                    <th>lbs</th>
                                    <th>Reps</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>100</td>
                                    <td>8</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>100</td>
                                    <td>8</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                    <CardActions>
                        <IconButton>
                            <Favorite />
                        </IconButton>
                        <p>3 Likes</p>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default Explore;
