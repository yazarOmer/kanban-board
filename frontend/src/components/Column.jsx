import React from "react";
import TaskCard from "./TaskCard";

const Column = ({ column, tasks }) => {
    return (
        <div className="w-[280px] flex flex-col">
            <p className="text-xs text-medium-grey uppercase font-bold tracking-widest mb-3">
                {`${column?.name} (${tasks.length})`}
            </p>

            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
};

export default Column;
