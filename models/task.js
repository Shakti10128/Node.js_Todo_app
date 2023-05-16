import mongoose from "mongoose";

// creating schema
const schema = new mongoose.Schema({
    Task:{
        type:String,
        require:true,
    },
    Description:{
        type:String,
        require:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        // pass ref value as same as the model name of user
        ref:"user",
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})
// creatin model
export const task = mongoose.model("Task",schema);