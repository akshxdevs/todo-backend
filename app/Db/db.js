const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://aksh:aka123@atlascluster.zjyi9.mongodb.net/";

mongoose.connect(mongoURI, {
    dbName: "todo-app",
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((e) => {
    console.error("Error connecting to MongoDB:", e);
});
