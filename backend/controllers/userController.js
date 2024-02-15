// backend/controllers/userController.js

const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Atualiza os detalhes do perfil do usuário
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfile = req.body;
    // Você pode adicionar validações adicionais aqui, se necessário
    await User.findByIdAndUpdate(id, updatedProfile);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Exclui a conta do usuário
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    // Você pode adicionar mais verificações aqui, como confirmação de senha
    await User.findByIdAndDelete(id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Recupera a senha do usuário
exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Implemente lógica de recuperação de senha aqui, como envio de e-mail com um link para redefinir a senha
    res.json({ message: "Password recovery instructions sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
