const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET;

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ error: "User already exists" });
    }

    const token = jwt.sign({ email }, SECRET);

    const newUser = await User.create({ name, email, password });

    res.json({ newUser, token });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
