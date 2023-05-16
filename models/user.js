import mongoose from "mongoose";

// creating schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    select: false,
    require: true,
  },
  createdAT: {
    type: Date,
    default: Date.now,
    require: true,
  },
  // user:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   // ref value as same as collection name
  //   ref:"User",
  //   require:true,
  // }
});
// creatin model
export const user = mongoose.model("Users", schema);
