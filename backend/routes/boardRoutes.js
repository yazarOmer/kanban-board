const express = require("express");
const router = express.Router();
const {
    getBoard,
    getAllBoards,
    createBoard,
    updateBoard,
    deleteBoard,
} = require("../controllers/boardController");
const protected = require("../middlewares/authMiddleware");

router.get("/getAll", protected, getAllBoards);
router.get("/getBoard/:id", protected, getBoard);
router.post("/create", protected, createBoard);
router.put("/getBoard/:id", protected, updateBoard);
router.delete("/delete/:id", protected, deleteBoard);

module.exports = router;
