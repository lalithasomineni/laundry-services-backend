const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Shop = require("../models/laundryshop");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const auth = require("../middlewares/auth");



router.post("/registercustomer",async(req,res)=>{
 let newCustomer = new Customer({
         username: req.body.username,
          email:req.body.email,
          phoneNumber: req.body.phoneNumber, 
          password:req.body.password,
         geometry: req.body.geometry
     })
  const salt = await bcrypt.genSalt(14)
    newCustomer.password = await bcrypt.hash(newCustomer.password,salt);
    newCustomer = await newCustomer.save()
     newCustomer.save().then(result=>{
         res.json(result);
     }).catch(err=>{
      res.json(err);
     })

 });

router.post("/logincustomer",(req,res)=>{
  const customer =  Customer.findOne({username:req.body.username});
  if(!customer){
    return res.status(404).json("error");
  }
  let isMatch =  bcrypt.compare(req.body.password,customer.password);
  if(isMatch){
    let token = jwt.sign(
       {
        customer_id: customer._id,
        username: customer.username,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        geometry: customer.geometry
      },
      SECRET,
      { expiresIn: "7 days" }
    );
     let result = {
      username: customer.username,
      email: customer.email,
      token: `bearer ${token}`,
      expiresIn: 168
    };
    return res.status(200).send(result);
  }
  else{
    res.send("login failed");
  }
})

router.get('/allshops',[auth],(req,res)=>{
  Shop.find().then(result=>{
    res.send(result);
  }).catch(err=>{
    res.json(err);
  })
})

router.get('/nearbyshops', (req, res)=>{
   Shop.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100, spherical: true}
    ).then(result=>{
        res.send(result);
    }).catch(err=>{
      res.send(err);
    });
});
module.exports = router;