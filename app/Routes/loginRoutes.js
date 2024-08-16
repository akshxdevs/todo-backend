const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

// Check if SECRET is set
if (!SECRET) {
    throw new Error("SECRET environment variable is not set");
}

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Compare the provided password with the stored hash
        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            {
                email: user.email,
                _id: user._id,
            },
            SECRET,
            { expiresIn: '1h' } 
        );

        // Respond with the token and user details
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
        });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
