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