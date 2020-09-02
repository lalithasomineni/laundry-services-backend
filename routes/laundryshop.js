const express = require("express");
const router = express.Router();
const Shop = require("../models/laundryshop");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//const salt =  bcrypt.genSalt(14)

router.get("/",(req,res)=>{
  Shop.find().then(result=>{
    res.send(result);
  }).catch(err=>{
    res.send(err);
  })
})


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
  const shop =  Shop.findOne({name:req.body.name});
  if(!customer){
    return res.status(404).json("error");
  }
  let isMatch =  bcrypt.compare(req.body.password,shop.password);
  if(isMatch){
    let token = jwt.sign(
       { 
          shop_id:shop._id,
          name: shop.name,
          email:shop.email,
          phoneNumber: shop.phoneNumber, 
          password:shop.password,
          OpeningTime:shop.OpeningTime,
          ClosingTime: shop.ClosingTime,
          geometry: shop.geometry
      },
      SECRET,
      { expiresIn: "7 days" }
    );
     let result = {
          name: shop.name,
          email:shop.email,
          phoneNumber: shop.phoneNumber, 
          token: `bearer ${token}`,
          expiresIn: 168
    };
    return res.status(200).send(result);
  }
  else{
    res.send("login failed");
  }
})


router.get("/:id", (req, res) => {
  const id = req.params.id;
   Shop.findById({_id:id}).then(result=>{
    res.send(result);
   }).catch(err=>{
    res.send(err);
   })
});
router.patch("/:shopId", (req, res, next) => {
  const id = req.params.shopId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Shop.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product updated'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

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