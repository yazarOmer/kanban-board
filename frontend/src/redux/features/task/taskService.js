import axios from "axios";

const API_URL = "/api/tasks/";

const createTask = async (data) => {
    const response = await axios.post(API_URL + "create", data);

    return response.data;
};

const getTask = async (id) => {
    const response = await axios.get(API_URL + `getTask/${id}`);

    return response.data;
};

const getAllTasks = async (id) => {
    const response = await axios.get(API_URL + `getAll/${id}`);

    return response.data;
};

const deleteTask = async (id) => {
    const response = await axios.delete(API_URL + `delete/${id}`);

    return response.data;
};

const updateTask = async (data) => {
    const { title, description, subtasks, status, boardId } = data;
    const response = await axios.put(API_URL + `getTask/${data.id}`, {
        title,
        description,
        subtasks,
        status,
        boardId,
    });

    return response.data;
};

const taskService = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
};

export default taskService;
