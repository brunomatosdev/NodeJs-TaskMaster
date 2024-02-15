// backend/controllers/taskController.js

const Task = require("../models/Task");

// Obtém todas as tarefas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cria uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;
    const newTask = new Task({ title, description, assignedTo, deadline });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Atualiza uma tarefa existente
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    await Task.findByIdAndUpdate(id, updatedTask);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Exclui uma tarefa existente
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
