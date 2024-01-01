import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { createBoard, reset } from "../../redux/features/board/boardSlice";

const AddBoard = ({ closeModal }) => {
    const [name, setName] = useState("");
    const [columns, setColumns] = useState([]);

    const dispatch = useDispatch();

    const handleInputChange = (id, event) => {
        const newFormValues = columns.map((input, i) =>
            i === id ? { ...input, name: event.target.value } : input
        );
        setColumns(newFormValues);
    };

    const handleDelete = (id) => {
        const newColumns = columns.filter((col) => col.id !== id);
        setColumns(newColumns);
    };

    const boardData = { name, columns };

    const handleCreateBoard = async () => {
        await dispatch(createBoard(boardData));
        await dispatch(reset());
        closeModal(false);
    };

    return (
        <div className="fixed z-10 inset-0 bg-black-color/50 flex items-center justify-center">
            <div className="w-[480px]  flex flex-col p-8 bg-dark-grey rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-white-color">
                        Add New Board
                    </h1>
                    <IoClose
                        onClick={() => closeModal(false)}
                        size={32}
                        className="text-medium-grey hover:bg-dark-border transition cursor-pointer rounded-full"
                    />
                </div>

                <label
                    htmlFor=""
                    className="font-bold text-xs text-white-color mt-8 mb-2"
                >
                    Board Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Web Design"
                    className="rounded-md p-2 text-sm border border-medium-grey/25 outline-none text-white-color bg-dark-grey"
                />

                <label
                    htmlFor=""
                    className="font-bold text-xs text-white-color mt-6"
                >
                    Board Columns
                </label>

                {columns.map((column, i) => {
                    return (
                        <div key={i} className="flex items-center gap-1 mb-2">
                            <input
                                type="text"
                                value={column.name}
                                onChange={(e) => handleInputChange(i, e)}
                                className="rounded-md w-full p-2 text-sm border border-medium-grey/25 outline-none text-white-color bg-dark-grey"
                            />
                            <button onClick={() => handleDelete(column.id)}>
                                <IoClose
                                    size={32}
                                    className="text-medium-grey hover:bg-dark-border transition cursor-pointer rounded-full"
                                />
                            </button>
                        </div>
                    );
                })}

                <button
                    onClick={() =>
                        setColumns((prev) => [
                            ...prev,
                            { name: "", id: Math.random() },
                        ])
                    }
                    className="w-full py-2.5 text-main-purple text-sm font-semibold bg-white-color rounded-[20px] mt-3"
                >
                    + Add New Column
                </button>
                <button
                    onClick={() => handleCreateBoard()}
                    className="w-full py-2.5 text-white-color text-sm font-semibold bg-main-purple rounded-[20px] mt-3"
                >
                    Create New Board
                </button>
            </div>
        </div>
    );
};

export default AddBoard;
