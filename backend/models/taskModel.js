const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subtasks: [{ text: String, isCompleted: Boolean }],
    status: {
        type: String,
        required: true,
    },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
