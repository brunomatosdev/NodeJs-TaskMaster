// backend/routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { verifyToken } = require("../utils/authUtils");

// Middleware para verificar a validade do token JWT em todas as rotas
router.use(verifyToken);

// Rota para obter todas as tarefas
router.get("/", taskController.getAllTasks);

// Rota para criar uma nova tarefa
router.post("/", taskController.createTask);

// Rota para atualizar uma tarefa existente
router.put("/:id", taskController.updateTask);

// Rota para excluir uma tarefa existente
router.delete("/:id", taskController.deleteTask);

module.exports = router;
