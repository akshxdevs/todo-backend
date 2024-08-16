const express = require("express");
const router = express.Router();
const Todo = require("../Schema/todoSchema");
const User = require("../Schema/userSchema");



router.get("/:userid", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userid });
        if (user) {
            const getAllTodos = await Todo.find({ userId: req.params.userid }); 
            res.status(200).json(getAllTodos);
        } else {
            res.status(404).json({ error: "User not found" }); 
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const { title, description, done, todoCreatedDate, dueDate, reminder, userId } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }
        const newTodo = await Todo.create({
            title,
            description,
            done,
            todoCreatedDate,
            dueDate,
            reminder,
            userId
        });
        res.status(201).json({ message: "Todo created successfully!", Todo: newTodo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/:todoid", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoid);
        if (todo) {
            todo.done = true;
            await todo.save();
            return res.json({ message: "Todo marked as done successfully", todo });
        } else {
            return res.status(404).json({ message: "Todo not found" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/edittodos/:todoid', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoid);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const { title, description } = req.body;
        todo.title = title || todo.title; 
        todo.description = description || todo.description; 
        await todo.save();
        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:todoid", async (req, res) => {
    try {
        const deleteResult = await Todo.deleteOne({ _id: req.params.todoid });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Todo not found" });
        } else {
            return res.json({ message: "Todo deleted successfully" });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;