const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

// Middleware para verificar a validade do token JWT
const verifyToken = (req, res, next) => {
  console.log("Verifying token...");
  console.log("Headers:", req.headers);
  console.log("Authorization:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log("Failed to authenticate token");
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    console.log("Token authenticated successfully");
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken; // Exporta apenas a função de middleware
