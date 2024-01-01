import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import options from "../../assets/options.svg";
import {
    getAllTasks,
    updateTask,
    reset,
    deleteTask,
} from "../../redux/features/task/taskSlice";

const ViewTask = ({ onClose }) => {
    const dispatch = useDispatch();

    const { selectedTask } = useSelector((state) => state.task);
    const { selectedBoard } = useSelector((state) => state.board);

    const boardId = selectedBoard._id;
    const [title, setTitle] = useState(selectedTask.name || null);
    const [description, setDescription] = useState(
        selectedTask.description || null
    );
    const [subtasks, setSubtasks] = useState(selectedTask.subtasks || null);
    const [status, setStatus] = useState(selectedTask.status || null);
    const [showButtons, setShowButtons] = useState(false);

    const id = selectedTask._id;

    const data = { title, description, subtasks, status, boardId, id };

    const onChangeHandler = (id) => {
        const newSubtasks = subtasks.map((sub) =>
            sub._id === id ? { ...sub, isCompleted: !sub.isCompleted } : sub
        );
        setSubtasks(newSubtasks);
    };

    const updateHandler = async (id) => {
        await dispatch(updateTask(data));
        await dispatch(reset());
        onClose(false);
        await dispatch(getAllTasks(boardId));
    };

    const deleteHandler = async (id) => {
        await dispatch(deleteTask(id));
        await dispatch(reset());
        onClose(false);
        await dispatch(getAllTasks(boardId));
    };

    return (
        <div className="fixed left-0 top-0 bg-black/25 w-screen h-screen flex items-center justify-center z-20">
            <div className="w-[480px]  flex flex-col p-8 bg-dark-grey rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg text-white-color text-left font-bold">
                        {title ? title : ""}
                    </h1>
                    <div className="relative">
                        <button
                            onClick={() => setShowButtons((prev) => !prev)}
                            className="w-10 h-10  flex items-center justify-center hover:bg-lines-dark  rounded-full  transition"
                        >
                            <img src={options} alt="" />
                        </button>

                        {showButtons && (
                            <div className="absolute right-0 top-8 w-[200px] flex flex-col mt-2 translate-x-2/4 z-10  bg-very-dark-grey border border-dark-border rounded-md">
                                <button
                                    onClick={() => updateHandler(boardId)}
                                    className="text-medium-grey hover:bg-lines-dark transition text-sm py-3"
                                >
                                    Edit Task
                                </button>
                                <button
                                    onClick={() =>
                                        deleteHandler(selectedTask._id)
                                    }
                                    className="text-red-color hover:bg-lines-dark transition text-sm py-3"
                                >
                                    Delete Task
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-sm text-medium-grey text-left mt-5 mb-3 font-semibold">
                    {description ? description : ""}
                </p>

                {subtasks.map((sub, i) => (
                    <div
                        key={i}
                        className="bg-very-dark-grey p-3 rounded mt-2 flex items-center gap-3"
                    >
                        <input
                            type="checkbox"
                            name="check"
                            id="check"
                            checked={sub.isCompleted}
                            onChange={() => onChangeHandler(sub._id)}
                            className="accent-main-purple"
                        />
                        <label
                            htmlFor="check"
                            className="font-bold text-sm text-gray-500"
                        >
                            {sub.text}
                        </label>
                    </div>
                ))}

                <div className="flex flex-col mt-3">
                    <label
                        htmlFor=""
                        className="text-left text-medium-grey text-xs font-bold mt-3 mb-2"
                    >
                        Current Status
                    </label>
                    <select
                        value={status ? status : null}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-dark-grey outline-none p-2 text-sm text-white-color border border-medium-grey/25 rounded-md accent-main-purple-main-purple"
                    >
                        {selectedBoard?.columns?.map((col) => (
                            <option
                                key={col._id}
                                value={col.name}
                                className="text-medium-grey text-sm font-semibold mb-2"
                            >
                                {col.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ViewTask;
