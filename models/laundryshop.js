const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Geolocation Schema
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

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    unique: true,
    match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  },
  password: {
     type: String,
     required: true,
  },
  OpeningTime: {
    type: String,
    required: [true, "timing is required"],
  },
  ClosingTime: {
      type: String,
    required: [true, "timing is required"],
  },
  geometry: GeoSchema,
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;