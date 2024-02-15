// backend/app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const loginRoutes = require("./routes/loginRoutes");
const taskRoutes = require("./routes/taskRoutes");
const registerRoutes = require("./routes/registerRoutes"); // Importe as rotas de registro
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/login", loginRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/register", registerRoutes); // Use as rotas de registro

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
