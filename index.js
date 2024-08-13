const express = require("express");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 3000; 
const app = express();
const db = require("./Db/db");


app.use(express.json());
app.use(cors());


const LoginRoutes = require('./Routes/loginRoutes');
const SignupRoutes = require('./Routes/signupRoutes');
const TodoRoutes = require('./Routes/todoRoutes');


app.use("/login", LoginRoutes);
app.use("/signup", SignupRoutes);
app.use("/todos", TodoRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Todo App..');
});


app.use((err, req, res, next) => {
    res.status(500).send('Something went wrong!');
});

module.exports = app;


if (db) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
} else {
    console.error("ERROR: Database connection failed.");
}