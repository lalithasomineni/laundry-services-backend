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
  },
  email:{
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  password: {
     type: String,
     required: true,
  },
  geometry: GeoSchema
  });

   const Customer = mongoose.model("Customer", userSchema);
  module.exports = Customer;
