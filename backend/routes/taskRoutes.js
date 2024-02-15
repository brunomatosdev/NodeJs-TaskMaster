// backend/routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../utils/authUtils"); // Importa a função de middleware

// Rota para obter todas as tarefas
router.get("/", verifyToken, taskController.getAllTasks); // Adiciona o middleware diretamente à rota

// Rota para criar uma nova tarefa
router.post("/", verifyToken, taskController.createTask); // Adiciona o middleware diretamente à rota

// Rota para atualizar uma tarefa existente
router.put("/:id", verifyToken, taskController.updateTask); // Adiciona o middleware diretamente à rota

// Rota para excluir uma tarefa existente
router.delete("/:id", verifyToken, taskController.deleteTask); // Adiciona o middleware diretamente à rota

module.exports = router;
