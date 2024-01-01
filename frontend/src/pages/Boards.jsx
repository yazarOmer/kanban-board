import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import EditBoard from "../components/modals/EditBoard";
import TaskGroup from "../components/TaskGroup";
import { getAllTasks, reset } from "../redux/features/task/taskSlice";

const Boards = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navbarOpen = useOutletContext();

    const { id } = useParams();

    const { selectedBoard, isLoading } = useSelector((state) => state.board);

    const fetchTasks = async (id) => {
        await dispatch(getAllTasks(id));
        await dispatch(reset());
    };

    useEffect(() => {
        fetchTasks(id);
    }, [selectedBoard]);

    const [showEditBoardModal, setShowEditBoardModal] = useState(false);

    if (showEditBoardModal) {
        return <EditBoard closeModal={setShowEditBoardModal} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div
            className={`${
                !navbarOpen
                    ? "w-[calc(100%-300px)] fixed left-[300px] transition-all duration-500"
                    : "w-full"
            } bg-very-dark-grey h-[calc(100%-96px)] fixed top-24 flex items-center justify-center `}
        >
            {selectedBoard?.columns?.length == 0 ? (
                <div className="flex flex-col items-center gap-5">
                    <p className="text-lg text-medium-grey font-semibold">
                        This board is empty. Create a new column to get started
                    </p>
                    <button
                        onClick={() => setShowEditBoardModal(true)}
                        className="bg-main-purple hover:bg-main-purple-hover text-white-color transition h-11 px-4 rounded-3xl  font-semibold text-sm"
                    >
                        + Add New Column
                    </button>
                </div>
            ) : (
                <TaskGroup selected={selectedBoard} />
            )}
        </div>
    );
};

export default Boards;
