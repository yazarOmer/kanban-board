import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask, reset } from "../redux/features/task/taskSlice";
import ViewTask from "./modals/ViewTask";
import Loading from "./Loading";

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();

    const [showEditTask, setShowEditTask] = useState(false);

    const { isLoading } = useSelector((state) => state.task);

    const handleCardClick = async (id) => {
        await dispatch(getTask(id));
        await dispatch(reset());
        setShowEditTask(true);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (showEditTask) {
        return <ViewTask onClose={setShowEditTask} />;
    }

    return (
        <div
            onClick={() => handleCardClick(task._id)}
            className="w-full z-10 bg-dark-grey rounded-lg mb-3 px-4 py-5 hover:cursor-pointer drop-shadow-task group"
        >
            <p className="text-sm text-white-color font-bold tracking-wider mb-2 group-hover:text-main-purple  transition-all">
                {task.title}
            </p>
            <p className="text-xs text-medium-grey font-bold">
                {`${
                    task.subtasks.filter((sub) => sub.isCompleted == true)
                        .length
                } of ${task.subtasks.length} subtasks`}
            </p>
        </div>
    );
};

export default TaskCard;
