const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const list = require("./routes/list");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.jdzfnt4.mongodb.net/Todo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
    // Start the server after connecting to MongoDB
    app.listen(1000, () => {
      console.log("Server started on port 1000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Authentication middleware
app.use("/api/v1", (req, res, next) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, "Somil123@");
      req.userData = { userId: decodedToken.userId };
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  next();
});

// Register and Sign-in functionality
app.use("/api/v1", authRouter);
app.use("/api/v2", list);

module.exports = app;
