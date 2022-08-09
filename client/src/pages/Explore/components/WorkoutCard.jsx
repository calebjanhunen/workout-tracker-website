import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
} from '@material-ui/core';
import { Favorite, MoreVert } from '@mui/icons-material';
import moment from 'moment';
import { useSelector } from 'react-redux';

import styles from './WorkoutCard.module.css';

import { useGetuserByIdQuery } from 'redux/features/authApiSlice';
import { useUpdateWorkoutMutation } from 'redux/features/workoutsApiSlice';

const WorkoutCard = ({ workoutInfo }) => {
    const userId = useSelector(state => state.auth.userId);
    const {
        data: username,
        isLoading,
        isSuccess,
        isError,
    } = useGetuserByIdQuery(workoutInfo.owner);
    const [updateWorkout] = useUpdateWorkoutMutation();
    const isLiked = workoutInfo.likedBy.includes(userId);
    console.log(workoutInfo.likedBy);
    console.log(userId);
    async function handleToggleLike() {
        if (!isLiked)
            await updateWorkout({
                ...workoutInfo,
                likedBy: [...workoutInfo.likedBy, userId],
            });
        else
            await updateWorkout({
                ...workoutInfo,
                likedBy: workoutInfo.likedBy.filter(id => id !== userId),
            });
    }

    let workoutCardDisplay;
    if (isLoading) {
        workoutCardDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        workoutCardDisplay = (
            <Card className={styles.workoutPost} elevation={10}>
                <CardHeader
                    avatar={<Avatar>{username.username[0]}</Avatar>}
                    action={
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    }
                    title={username.username}
                    subheader={moment(workoutInfo.sharedAt).fromNow()}
                />
                <CardContent>
                    <h2>{workoutInfo.name}</h2>
                    <p>{workoutInfo.exercises.length} exericises</p>
                </CardContent>
                <CardActions>
                    <IconButton onClick={handleToggleLike}>
                        <Favorite
                            className={
                                isLiked
                                    ? styles.heartIconLiked
                                    : styles.heartIcon
                            }
                        />
                    </IconButton>
                    <p>{workoutInfo.likedBy.length} Likes</p>
                </CardActions>
            </Card>
        );
    } else if (isError) {
        workoutCardDisplay = <p>Error displaying workout post</p>;
    }

    return <>{workoutCardDisplay}</>;
};

export default WorkoutCard;

/*
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
                    */
