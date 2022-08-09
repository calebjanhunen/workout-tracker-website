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

import styles from './WorkoutCard.module.css';

import { useGetuserByIdQuery } from 'redux/features/authApiSlice';

const WorkoutCard = ({ workoutInfo }) => {
    const {
        data: username,
        isLoading,
        isSuccess,
        isError,
    } = useGetuserByIdQuery(workoutInfo.owner);

    let workoutCardDisplay;
    if (isLoading) {
        workoutCardDisplay = <p>Loading...</p>;
    } else if (isSuccess) {
        workoutCardDisplay = (
            <Card className={styles.workoutPost} elevation={10}>
                <CardHeader
                    avatar={<Avatar>C</Avatar>}
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
                    <IconButton>
                        <Favorite />
                    </IconButton>
                    <p>{workoutInfo.likeCount} Likes</p>
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
