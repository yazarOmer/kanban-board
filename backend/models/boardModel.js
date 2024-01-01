const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        columns: [{ name: String }],
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
