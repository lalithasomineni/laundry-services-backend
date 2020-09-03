const express = require("express");
const router = express.Router();
const Shop = require("../models/laundryshop");
const Customer = require("../models/customer");
const Admin = require("../models/admin");
const Pickup = require("../models/pickup");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");


router.post("/:customerId",auth,(req,res)=>{

	const id = req.params.customerId;
	const customer = Customer.findById({_id:id});
	if(req.customer=id){

const newPickup = new Pickup({
      customerId : req.params.customerId,
      slot:req.body.slot,
      quantity:req.body.quantity,
      selectedstoreId:req.body.selectedstoreId,
      paymentMode: req.body.paymentmethod,
      isPaid: req.body.isPaid
	})
 
  newPickup.save().then(result=>{
  	res.json(result);
  }).catch(err=>{
  	res.json(err);
  })
}
else{
	res.send("permission denied")
}

})

router.put('/update/:myid',[auth],async(req, res) => {
 const id = req.params.myid;
 const pickup = Pickup.findById({_id:id});
 if(req.pickup=id){
    pickup.slot = req.body.slot;
    pickup.quantity = req.body.quantity;
    await pickup.save().then(result=>{
    	res.send(result);
    }).catch(err=>{
    	res.send(err);
    })
 }
 else{
 	res.send("not found");
 }
})

//for shop
router.get("/",auth,(req,res)=>{
    const id = req.query.selectedstoreId;
  const shop = Shop.findById({_id:id});
   if(req.shop = id){
    Pickup.find({selectedstoreId:id}).then(result=>{
    	res.json(result);
    }).catch(err=>{
    	res.json(err);
    })
}
else{
	res.send("permission denied")
}

})



router.delete("/:myid",auth,(req,res)=>{
    const id = req.params.myid;
  const pickup = Pickup.findById({_id:id});
  if(req.pickup = id){
   Pickup.remove({id:req.body.id}).then(result=>{
     res.json({
      status: "deleted succesfully",
      result:result
     })
   }).catch(err=>{
    res.json(err);
   })
 }
 else{
  res.json("permission denied");
 }
})

router.get("/:id", (req, res) => {
  const id = req.params.id;
   Pickup.findById({_id:id}).then(result=>{
    res.send(result);
   }).catch(err=>{
    res.send(err);
   })
});


module.exports = router;