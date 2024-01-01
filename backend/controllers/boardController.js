const asyncHandler = require("express-async-handler");
const Board = require("../models/boardModel");

const getBoard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const board = await Board.findById(id);

    if (board) {
        res.status(200).json({
            _id: board._id,
            name: board.name,
            columns: board.columns,
        });
    }
});

const deleteBoard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedBoard = await Board.findByIdAndDelete(id);

    if (deletedBoard) {
        res.status(200).json(deletedBoard);
    }
});

const updateBoard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, columns } = req.body;

    const board = await Board.findByIdAndUpdate(
        id,
        { name, columns },
        {
            new: true,
        }
    );

    if (board) {
        res.status(200).json({
            _id: board._id,
            name: board.name,
            columns: board.columns,
        });
    }
});

const getAllBoards = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const boards = await Board.find({ userId });

    if (boards) {
        res.json(boards).select("-columns");
    }
});

const createBoard = asyncHandler(async (req, res) => {
    const { name, columns } = req.body;
    const userId = req.user._id;

    const board = await Board.create({ name, columns, userId });

    if (board) {
        res.status(201).json({
            _id: board._id,
            name: board.name,
            columns: board.columns,
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

module.exports = {
    getBoard,
    deleteBoard,
    getAllBoards,
    createBoard,
    updateBoard,
};
