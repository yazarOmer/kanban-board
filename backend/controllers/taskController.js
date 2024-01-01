const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const createTask = asyncHandler(async (req, res) => {
    const { title, description, subtasks, status, boardId } = req.body;

    const task = await Task.create({
        title,
        description,
        subtasks,
        status,
        boardId,
    });

    if (task) {
        res.status(201).json({
            _id: task._id,
            name: task.title,
            description: task.description,
            subtasks: task.subtasks,
            status: task.status,
            boardId: task.boardId,
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const getTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (task) {
        res.status(200).json({
            _id: task._id,
            name: task.title,
            description: task.description,
            subtasks: task.subtasks,
            status: task.status,
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const getAllTasks = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const tasks = await Task.find({ boardId: id });

    if (tasks) {
        res.status(200).json(tasks);
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
        res.status(200).json(deletedTask);
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, subtasks, status, boardId } = req.body;

    const task = await Task.findByIdAndUpdate(
        id,
        { title, description, subtasks, status, boardId },
        {
            new: true,
        }
    );

    if (task) {
        res.status(200).json({
            _id: task._id,
            name: task.title,
            description: task.description,
            subtasks: task.subtasks,
            status: task.status,
        });
    }
});

module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
