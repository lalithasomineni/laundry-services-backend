const express = require("express");
const router = express.Router();
const Shop = require("../models/laundryshop");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
//const salt =  bcrypt.genSalt(14)


router.post("/registershop",async(req,res)=>{
	 let newShop = new Shop({
	 	name: req.body.name,
	 	  email:req.body.email,
          phoneNumber: req.body.phoneNumber, 
          password:req.body.password,
           OpeningTime:req.body.OpeningTime,
         ClosingTime: req.body.ClosingTime,
         geometry: req.body.geometry
  	 })
  const salt = await bcrypt.genSalt(14)
    newShop.password = await bcrypt.hash(newShop.password,salt);
    newShop = await newShop.save()
  	 newShop.save().then(result=>{
         res.json(result);
  	 }).catch(err=>{
  	 	res.json(err);
  	 })

 });

router.post("/loginshop",(req,res)=>{
	//login using jwt we need to generate a jwt token
})


//add authentication to the delete route
router.delete("/deletemyshop/:id",(req,res)=>{
   Shop.remove({_id:req.body.id}).then(result=>{
   	 res.json({
   	 	status: "deleted succesfully",
   	 })
   }).catch(err=>{
   	res.json(err);
   })
})

//add update route only for authenticated users

module.exports = router;