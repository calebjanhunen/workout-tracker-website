import React from "react";

import EditWorkoutForm from "./EditWorkoutForm/EditWorkoutForm";
import WorkoutCardInfo from "./WorkoutCardInfo/WorkoutCardInfo";
import { getWorkoutsStatus } from "../../../redux/features/workouts/workoutSlice";
import { useSelector } from "react-redux";

let WorkoutCard = ({ workoutInfo, setReload, setChangedWorkoutId }) => {
    const [showEditForm, setShowEditForm] = React.useState(false);
    const workoutsStatus = useSelector(getWorkoutsStatus);
    console.log(workoutInfo);

    return showEditForm ? (
        <EditWorkoutForm
            workoutInfo={workoutInfo}
            setShowEditForm={setShowEditForm}
            setReload={setReload}
            setEditedWorkoutId={setChangedWorkoutId}
        />
    ) : (
        <WorkoutCardInfo
            workoutInfo={workoutInfo}
            setShowEditForm={setShowEditForm}
            setDeletedWorkoutId={setChangedWorkoutId}
        />
    );
};

WorkoutCard = React.memo(WorkoutCard);
export default WorkoutCard;
