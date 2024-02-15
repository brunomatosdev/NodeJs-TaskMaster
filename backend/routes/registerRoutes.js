// routes/registerRoutes.js

const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

// Rota para registrar um novo usuário
router.post("/", register);

module.exports = router;
