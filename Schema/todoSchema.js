const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    todoCreatedDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: String,
        required:true
    },
    reminder:{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
        required:true
    }
});

const Todo = mongoose.model("Todo",TodoSchema);

module.exports = Todo;