import React from "react";
import moment from "moment";
import TrashBinImage from "../../../images/trash-bin.png";
import EditIcon from "../../../images/edit-btn-icon.png";

import "./WorkoutCardStyles.css";
import DeleteWorkoutModal from "./DeleteWorkoutModal";
import EditWorkoutForm from "./EditWorkoutForm/EditWorkoutForm";
import WorkoutCardInfo from "./WorkoutCardInfo";

const WorkoutCard = ({
    title,
    date,
    exercises,
    id,
    setReload,
    setChangedWorkoutId,
}) => {
    const [showEditForm, setShowEditForm] = React.useState(false);

    return showEditForm ? (
        <EditWorkoutForm
            title={title}
            date={date}
            exercises={exercises}
            id={id}
            setShowEditForm={setShowEditForm}
            setReload={setReload}
            setDeletedWorkoutId={setChangedWorkoutId}
        />
    ) : (
        <WorkoutCardInfo
            title={title}
            date={date}
            exercises={exercises}
            id={id}
            setShowEditForm={setShowEditForm}
            setDeletedWorkoutId={setChangedWorkoutId}
        />
    );
};

export default WorkoutCard;
