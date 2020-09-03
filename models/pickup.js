const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customer = require("../models/customer");
const shop = require("../models/laundryshop");

const pickupSchema = new Schema({
  
      customerId : {type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
      slot: {type:String,required:true},
      selectedstoreId:{type: mongoose.Schema.Types.ObjectId,ref:'shop'},
      paymentMode: { type: String, default: 'Cash On delivery', required: true },
      isPaid: { type: Boolean, default: false },
      quantity: {type:Number,required:true}  


  })

   const Pickup = mongoose.model("Pickup", pickupSchema);
  module.exports = Pickup;