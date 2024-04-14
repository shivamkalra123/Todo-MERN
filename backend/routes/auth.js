const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register functionality
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Hash the password
        const hashpassword = bcrypt.hashSync(password, 10);

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = new User({ email, username, password: hashpassword });
        await user.save();

        // Generate JWT tokenz
        const token = jwt.sign({ userId: user._id }, "Somil123@", { expiresIn: "1h" });

        // Exclude password hash from the response
        const { password: userPassword, ...userData } = user._doc;
        res.cookie('auth_token', token, { httpOnly: true }); 
        res.status(200).json({ user: userData, token: token, message: "Sign Up Successful" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign-in functionality
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        // Compare passwords
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "Somil123@", { expiresIn: "1h" });

        // Exclude password hash from the response
        const { password: userPassword, ...userData } = user._doc;
        res.cookie('auth_token', token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", user: userData, token: token });
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
