import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { Favorite, MoreVert } from '@mui/icons-material';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './WorkoutCard.module.css';

import { useGetuserByIdQuery } from 'redux/features/authApiSlice';
import { useUpdateWorkoutMutation } from 'redux/features/workoutsApiSlice';
import { useCreateWorkoutTemplateMutation } from 'redux/features/workoutTemplatesApiSlice';
import Comments from '../Comments/Comments';

const WorkoutCard = ({ workoutInfo }) => {
    const userId = useSelector(state => state.auth.userId);
    const loggedInUser = useSelector(state => state.auth.user);
    const {
        data: username,
        isLoading,
        isSuccess,
        isError,
    } = useGetuserByIdQuery(workoutInfo.owner);
    const [updateWorkout] = useUpdateWorkoutMutation();
    const [createWorkoutTemplate] = useCreateWorkoutTemplateMutation();
    const isLiked = workoutInfo.likedBy.includes(userId);
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

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

    async function handlePostComment() {
        await updateWorkout({
            ...workoutInfo,
            comments: [
                { user: loggedInUser, userId, comment },
                ...workoutInfo.comments,
            ],
        });
        setComment('');
    }

    async function handleSaveAsTemplate() {
        await createWorkoutTemplate({
            workoutName: workoutInfo.name,
            exercises: workoutInfo.exercises,
            createdBy: workoutInfo.owner,
        });
    }

    async function handleRemoveSharedWorkout() {
        await updateWorkout({
            ...workoutInfo,
            public: false,
            likedBy: [],
            comments: [],
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
                        <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
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
                    <p>
                        {workoutInfo.likedBy.length}{' '}
                        {workoutInfo.likedBy.length === 1 ? 'Like' : 'Likes'}
                    </p>
                </CardActions>
                <input
                    placeholder="Add a comment..."
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                />
                <button
                    onClick={handlePostComment}
                    disabled={comment === '' ? true : false}
                >
                    Post
                </button>
                <button onClick={() => setShowComments(prev => !prev)}>
                    {showComments ? 'Hide' : 'Show'} Comments
                </button>
                {showComments && (
                    <div className={styles.comments}>
                        {workoutInfo.comments.map(comment => (
                            <Comments
                                key={comment._id}
                                workoutInfo={workoutInfo}
                                comment={comment}
                                userId={userId}
                            />
                        ))}
                    </div>
                )}
            </Card>
        );
    } else if (isError) {
        workoutCardDisplay = <p>Error displaying workout post</p>;
    }

    return (
        <>
            {workoutCardDisplay}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {userId !== workoutInfo.owner ? (
                    <MenuItem onClick={handleSaveAsTemplate}>
                        Save as Template
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleRemoveSharedWorkout}>
                        Remove
                    </MenuItem>
                )}
            </Menu>
        </>
    );
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
