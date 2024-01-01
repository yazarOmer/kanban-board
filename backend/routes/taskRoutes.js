const express = require("express");
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");
const protected = require("../middlewares/authMiddleware");

router.post("/create", protected, createTask);
router.get("/getAll/:id", protected, getAllTasks);
router.get("/getTask/:id", protected, getTask);
router.put("/getTask/:id", protected, updateTask);
router.delete("/delete/:id", protected, deleteTask);

module.exports = router;
