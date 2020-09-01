const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const Shop = require("../models/laundryshop");
//const salt =  bcrypt.genSalt(14)


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

 })

//******login route using jwt


router.get('/allshops',(req,res)=>{
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