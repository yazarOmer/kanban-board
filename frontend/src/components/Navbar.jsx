import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import kanbanLogo from "../assets/kanban-logo.svg";
import linkLogo from "../assets/linkLogo.svg";
import linkLogoActive from "../assets/linkLogoActive.svg";
import createBoardLogo from "../assets/createBoardLogo.svg";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import toggle from "../assets/toggle.svg";
import eye from "../assets/eye.svg";
import navbar from "../assets/navbar.svg";
import { useSelector, useDispatch } from "react-redux";
import { getAllBoards, reset } from "../redux/features/board/boardSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import AddBoard from "./modals/AddBoard";

const Navbar = ({ navbarOpen, navbarToggle }) => {
    const [showAddBoardModal, setShowAddBoardModal] = useState(false);

    const { id } = useParams();

    const dispatch = useDispatch();

    const { boards, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.board
    );

    // console.log(id);

    const fetchData = async () => {
        await dispatch(getAllBoards());
        await dispatch(reset());
    };

    useEffect(() => {
        fetchData();

        if (isError) {
            toast.error(message);
        }
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (showAddBoardModal) {
        return <AddBoard closeModal={setShowAddBoardModal} />;
    }

    return (
        <nav
            className={`bg-dark-grey absolute h-screen ${
                navbarOpen ? "left-[-300px]" : "left-0"
            } w-[300px] py-5 flex flex-col justify-between transition-all duration-500 border-r border-[#979797]/25`}
        >
            <div className="">
                <Link className="flex items-center gap-2 px-6 text-3xl font-bold text-white-color mb-6">
                    <img src={kanbanLogo} />
                    Kanban
                </Link>

                <p className="text-xs tracking-[2.4px] px-6 text-medium-grey font-bold mt-8 mb-5">
                    ALL BOARDS ({boards.length})
                </p>

                {boards.map((item) => {
                    return (
                        <NavLink
                            key={item._id}
                            to={`/boards/${item._id}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-main-purple text-white-color w-[90%] font-bold py-3.5 px-6  text-sm capitalize rounded-r-[100px] flex gap-3 hover:bg-white-color hover:text-main-purple tracking-normal transition"
                                    : "bg-dark-grey text-medium-grey w-[90%] font-bold py-3.5 px-6  text-sm capitalize rounded-r-[100px] flex gap-3 hover:bg-white-color hover:text-main-purple tracking-normal transition"
                            }
                        >
                            <img
                                src={id == item._id ? linkLogoActive : linkLogo}
                                alt=""
                            />
                            {item.name}
                        </NavLink>
                    );
                })}

                <button
                    onClick={() => setShowAddBoardModal(true)}
                    className="text-main-purple font-bold flex items-center w-[90%] py-3.5 px-6 text-sm capitalize rounded-r-[100px] gap-3 hover:bg-white-color hover:text-main-purple transition"
                >
                    <img src={createBoardLogo} alt="" />+ Create New Board
                </button>
            </div>

            <div className="w-[90%]">
                <div className="w-[90%] mx-auto">
                    <div className="flex items-center justify-center gap-4 w-full h-12 rounded-md bg-very-dark-grey ">
                        <img src={sun} alt="" />
                        <img src={toggle} alt="" />
                        <img src={moon} alt="" />
                    </div>
                </div>
                <button
                    onClick={() => navbarToggle((prev) => !prev)}
                    className="flex w-full mr-auto mt-2 items-center rounded-r-[100px] text-medium-grey font-bold py-4 px-6 text-sm gap-3  hover:bg-white-color hover:text-main-purple"
                >
                    <img src={eye} alt="" />
                    Hide Sidebar
                </button>
            </div>

            <button
                onClick={() => navbarToggle((prev) => !prev)}
                className={`${
                    navbarOpen ? "flex items-center justify-center" : "hidden"
                } bg-main-purple hover:bg-main-purple-hover transition w-14 h-12  rounded-r-[100px] absolute left-[300px] bottom-10 z-10`}
            >
                <img src={navbar} alt="" />
            </button>
        </nav>
    );
};

export default Navbar;
