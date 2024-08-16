const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name:String,
    password: String,
    email:{type:String,lowercase:true}
});

module.exports = mongoose.model("User",UserSchema);