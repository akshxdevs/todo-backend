const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "your_default_mongo_uri_here";

mongoose.connect(mongoURI, {
    dbName: "todo-app",
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((e) => {
    console.error("Error connecting to MongoDB:", e);
});
