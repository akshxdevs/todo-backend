const express = require("express");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const app = express();
const db = require("./Db/db");

// Middleware
app.use(express.json());
app.use(cors());

// Route files
const LoginRoutes = require('./Routes/loginRoutes');
const SignupRoutes = require('./Routes/signupRoutes');
const TodoRoutes = require('./Routes/todoRoutes');

// Routes
app.use("/login", LoginRoutes);
app.use("/signup", SignupRoutes);
app.use("/todos", TodoRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Todo App..');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app;

// Start server
if (db) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
} else {
    console.error("ERROR: Database connection failed.");
}