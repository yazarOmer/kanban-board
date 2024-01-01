import axios from "axios";

const API_URL = "/api/boards/";

const getAllBoards = async () => {
    const response = await axios.get(API_URL + "getAll");

    return response.data;
};

const updateBoard = async (data) => {
    const { name, columns } = data;
    const response = await axios.put(API_URL + `getBoard/${data.id}`, {
        name,
        columns,
    });

    return response.data;
};

const getBoard = async (id) => {
    const response = await axios.get(API_URL + `getBoard/${id}`);

    return response.data;
};

const deleteBoard = async (id) => {
    const response = await axios.delete(API_URL + `delete/${id}`);

    return response.data;
};

const createBoard = async (data) => {
    const response = await axios.post(API_URL + "create", data);

    return response.data;
};

const boardService = {
    getAllBoards,
    deleteBoard,
    createBoard,
    updateBoard,
    getBoard,
};

export default boardService;
