import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import kanbanLogo from "../assets/kanban-logo.svg";
import options from "../assets/options.svg";
import { useDispatch, useSelector } from "react-redux";
import {
    getBoard,
    deleteBoard,
    reset,
    getAllBoards,
} from "../redux/features/board/boardSlice";
import { logout } from "../redux/features/auth/authSlice";
import Loading from "./Loading";
import AddTask from "./modals/AddTask";
import EditBoard from "../components/modals/EditBoard";

const Header = ({ navbarOpen }) => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showAddTask, setShowAddTask] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showEditBoard, setShowEditBoard] = useState(false);

    const { selectedBoard, isLoading } = useSelector((state) => state.board);

    useEffect(() => {
        dispatch(reset());
        dispatch(getBoard(id));
    }, [id]);

    const showEditHandle = () => {
        setShowEditBoard(true);
        setShowButtons(false);
    };

    const logoutHandle = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    const deleteHandle = async () => {
        await dispatch(deleteBoard(id));
        await dispatch(reset());
        await dispatch(getAllBoards());
        await dispatch(reset());
        setShowButtons(false);
    };

    if (showAddTask) {
        return <AddTask closeModal={setShowAddTask} />;
    }

    if (showEditBoard) {
        return <EditBoard closeModal={setShowEditBoard} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <header
            className={`${
                !navbarOpen
                    ? "w-[calc(100%-300px)] fixed left-[300px] z-[10] transition-all duration-500"
                    : "w-full"
            } bg-dark-grey h-24 flex items-center border-b z-[10] border-[#979797]/25`}
        >
            {navbarOpen && (
                <Link className="flex items-center gap-2 px-6 text-3xl font-bold text-white-color">
                    <img src={kanbanLogo} alt="" />
                    kanban
                </Link>
            )}
            <div
                className={`flex items-center justify-between w-full ml-5 ${
                    navbarOpen ? "border-l px-4 border-[#979797]/25" : ""
                } h-24`}
            >
                <h3 className="text-2xl font-bold text-white-color capitalize">
                    {selectedBoard ? selectedBoard.name : ""}
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        disabled={selectedBoard?.columns?.length == 0}
                        onClick={() => setShowAddTask(true)}
                        className={`bg-main-purple hover:bg-main-purple-hover ${
                            id
                                ? "bg-main-purple hover:bg-main-purple-hover text-white-color"
                                : "bg-main-purple/25 cursor-not-allowed text-medium-grey hover:bg-main-purple/25"
                        } transition disabled:cursor-not-allowed disabled:bg-main-purple-hover h-10 px-4 rounded-3xl  font-semibold text-sm`}
                    >
                        Add New Task
                    </button>

                    <div className="relative ">
                        <button
                            onClick={() => setShowButtons((prev) => !prev)}
                            className={`w-10 h-10 flex items-center justify-center  rounded-full hover:bg-dark-border transition`}
                        >
                            <img src={options} alt="" />
                        </button>

                        {showButtons && (
                            <div className="absolute right-[20px] top-8 w-[200px] flex flex-col mt-2   bg-dark-grey border border-dark-border rounded-md">
                                <button
                                    onClick={() => showEditHandle()}
                                    className="text-medium-grey hover:bg-lines-dark transition text-sm py-3"
                                >
                                    Edit Board
                                </button>
                                <button
                                    onClick={() => deleteHandle()}
                                    className="text-red-color hover:bg-lines-dark transition text-sm py-3"
                                >
                                    Delete Board
                                </button>
                                <button
                                    onClick={() => logoutHandle()}
                                    className="text-medium-grey hover:bg-lines-dark transition text-sm py-3"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
