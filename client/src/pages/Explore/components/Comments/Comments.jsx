import moment from 'moment';
import React from 'react';

import styles from './Comments.module.css';

import { useUpdateWorkoutMutation } from 'redux/features/workoutsApiSlice';

const Comments = ({ workoutInfo, comment, userId }) => {
    const [updateWorkout] = useUpdateWorkoutMutation();

    async function handleDeleteComment() {
        await updateWorkout({
            ...workoutInfo,
            comments: workoutInfo.comments.filter(
                com => com._id !== comment._id
            ),
        });
    }

    return (
        <div>
            <div className={styles.commentInfo}>
                <p>
                    <strong>{comment.user}: </strong>
                </p>
                <p>{comment.comment}</p>
                {userId === comment.userId && (
                    <button onClick={handleDeleteComment}>Delete</button>
                )}
            </div>
            <p className={styles.commentCreatedAt}>
                {moment(comment.createdAt).fromNow()}
            </p>
        </div>
    );
};

export default Comments;
