// routes/loginRoutes.js

const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// Rota para login de usuário
router.post("/", login);

module.exports = router;
