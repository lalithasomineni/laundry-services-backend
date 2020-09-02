const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Shop = require("../models/laundryshop");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const auth = require("../middlewares/auth");
var GeoJSON = require('geojson');



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

router.post("/logincustomer", (req, res, next) => {
  Customer.find({ phoneNumber: req.body.phoneNumber })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.APP_SECRET,
            {
                expiresIn: "7 days"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/allshops',(req,res)=>{
  Shop.find().then(result=>{
    res.send(result);
  }).catch(err=>{
    res.json(err);
  })
})

router.get('/nearbyshops', function(req, res, next){

    /*Shop.aggregate(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(result){
        res.send(result);
    }).catch(next);*/
    Shop.aggregate([{ $geoNear: { near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
     spherical: true, maxDistance: 100, distanceField: "dist.calculated" } }])
    .then(function(results){ res.send(results); }).catch(err=>{res.send(err)});
});

module.exports = router;