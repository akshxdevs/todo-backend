const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET;
console.log(SECRET);

if (!SECRET) {
    throw new Error("SECRET environment variable is not set");
}

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "User not found!!" });
        }

        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            return res.status(401).json({ error: "Incorrect Password!!" });
        }

        const token = jwt.sign(
            {
                email: user.email,
                _id: user._id,
            },
            SECRET,
            { expiresIn: '1h' } 
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error!!" });
    }
});

module.exports = router;
