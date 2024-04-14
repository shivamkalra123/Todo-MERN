const express = require("express");
const router = express.Router();
const List = require("../models/list");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Routes for task management
router.post("/addTask", async (req, res) => {
  try {
    const userId = req.query.userId; // Extract userId from query parameters
    const { title, body } = req.body;

    // Create a new task
    const newTask = await List.create({ title, body, createdBy: userId });

    res.status(201).json({ task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;

    // Find the existing task by ID and update it
    await List.findByIdAndUpdate(req.params.id, { title, body });

    res.status(200).json({ message: "Task Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    // Find the task by ID and delete it
    await List.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get tasks by user ID
router.get("/getTasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find tasks associated with the specified user ID
    const tasks = await List.find({ createdBy: userId });

    if (!tasks || tasks.length === 0) {
      res.status(404).json({ message: "No tasks found for the user" });
    } else {
      res.status(200).json({ tasks });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
