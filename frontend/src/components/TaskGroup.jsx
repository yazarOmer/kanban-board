import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import EditBoard from "./modals/EditBoard";
import { getAllTasks } from "../redux/features/task/taskSlice";

const TaskGroup = ({ selected }) => {
    const { tasks } = useSelector((state) => state.task);

    const [showEditBoardModal, setShowEditBoardModal] = useState(false);

    if (showEditBoardModal) {
        return <EditBoard closeModal={setShowEditBoardModal} />;
    }

    return (
        <div className="w-full h-full p-4 flex gap-5">
            {selected?.columns?.map((col) => (
                <Column
                    key={col?._id}
                    column={col}
                    tasks={tasks.filter((task) => task.status == col.name)}
                />
            ))}

            <button
                onClick={() => setShowEditBoardModal(true)}
                className="h-[700px] w-[280px] mt-7 rounded-md  bg-gradient-to-br from-[#2B2C37]/100 to-[#2B2C37]/50 hover:bg-[#2B2C37]/100 transition-all text-medium-grey font-bold text-xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]"
            >
                + New Column
            </button>
        </div>
    );
};

export default TaskGroup;
