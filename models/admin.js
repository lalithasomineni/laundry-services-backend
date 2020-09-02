const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name field is required"],
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phoneNumber: {
    type: Number,
    required: true,
    match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    unique: true
  },
  password: {
     type: String,
     required: true,
  },
  role: {
    type: String,
    default: "admin"
  }
  })

   const Admin = mongoose.model("Admin", adminSchema);
  module.exports = Admin;