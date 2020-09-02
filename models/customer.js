
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

const userSchema = new Schema({
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
  geometry: GeoSchema

  })

   const Customer = mongoose.model("Customer", userSchema);
  module.exports = Customer;
