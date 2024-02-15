// backend/controllers/taskController.js

const Task = require("../models/Task");

// Obtém todas as tarefas
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.userId; // Obtém o userId do token de autenticação
    const tasks = await Task.find({ assignedTo: userId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cria uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const userId = req.userId; // Obtém o userId do token de autenticação
    const { title, description, deadline } = req.body;
    const newTask = new Task({
      title,
      description,
      assignedTo: userId,
      deadline,
    });
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
    const userId = req.userId; // Obtém o userId do token de autenticação
    const { id } = req.params;
    const updatedTask = req.body;
    const task = await Task.findById(id);
    if (task.assignedTo !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }
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
    const userId = req.userId; // Obtém o userId do token de autenticação
    const { id } = req.params;
    const task = await Task.findById(id);
    if (task.assignedTo !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Obtém todas as tarefas de um usuário específico
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignedTo: userId }); // Filtra as tarefas pelo ID do usuário
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
