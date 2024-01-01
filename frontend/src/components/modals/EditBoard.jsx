import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
    updateBoard,
    reset,
    getAllBoards,
} from "../../redux/features/board/boardSlice";
import { useParams } from "react-router-dom";

const EditBoard = ({ closeModal }) => {
    const { selectedBoard } = useSelector((state) => state.board);
    const { id } = useParams();

    const [name, setName] = useState(selectedBoard.name);
    const [columns, setColumns] = useState(selectedBoard.columns);

    const dispatch = useDispatch();

    const handleInputChange = (id, event) => {
        const newFormValues = columns.map((input, i) =>
            input._id === id ? { ...input, name: event.target.value } : input
        );
        setColumns(newFormValues);
    };

    const handleDelete = (id) => {
        const newColumns = columns.filter((col) => col._id !== id);
        setColumns(newColumns);
    };

    const handleUpdateBoard = () => {
        dispatch(updateBoard({ id, name, columns }));
        dispatch(getAllBoards());
        dispatch(reset());
        closeModal(false);
    };

    return (
        <div className="fixed z-10 inset-0 bg-black-color/50 flex items-center justify-center">
            <div className="w-[480px]  flex flex-col p-8 bg-dark-grey rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-white-color">
                        Edit Board
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
                    className="font-bold text-xs text-white-color mt-6 mb-2"
                >
                    Board Columns
                </label>

                {columns.map((column, i) => {
                    return (
                        <div
                            key={column._id}
                            className="flex items-center gap-1 mb-2"
                        >
                            <input
                                type="text"
                                value={
                                    columns.length > 0 && column?.name !== null
                                        ? column?.name
                                        : ""
                                }
                                onChange={(e) =>
                                    handleInputChange(column?._id, e)
                                }
                                className="rounded-md w-full p-2 text-sm border border-medium-grey/25 outline-none text-white-color bg-dark-grey"
                            />
                            <button onClick={() => handleDelete(column?._id)}>
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
                            { value: "", id: Math.random() },
                        ])
                    }
                    className="w-full py-2.5 text-main-purple text-sm font-semibold bg-white-color rounded-[20px] mt-3"
                >
                    + Add New Column
                </button>
                <button
                    onClick={() => handleUpdateBoard()}
                    className="w-full py-2.5 text-white-color text-sm font-semibold bg-main-purple rounded-[20px] mt-3"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditBoard;
