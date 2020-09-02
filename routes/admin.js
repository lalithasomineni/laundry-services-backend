const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Shop = require("../models/laundryshop");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const auth = require("../middlewares/auth");
const GeoJSON = require('geojson');
const Admin = require("../models/admin");
//const checkRole = require("../utils/checkrole");

router.get("/alladmins",auth,(req,res)=>{
	Admin.find().then(result=>{
		res.send(result);
	}).catch(err=>{
		res.send(err);
	})
});

router.delete("/:adminId",auth,(req,res)=>{
    const id = req.params.adminId;
  const admin = Admin.findById({_id:id});
   Admin.remove({id:req.params._id}).then(result=>{
     res.json({
      status: "deleted succesfully",
      result:result
     })
   }).catch(err=>{
    res.json(err);
   })
})

router.post("/registeradmin",async(req,res)=>{
 let newAdmin = new Admin({
         username: req.body.username,
          email:req.body.email,
          phoneNumber: req.body.phoneNumber, 
          password:req.body.password
     })
  const salt = await bcrypt.genSalt(14)
    newAdmin.password = await bcrypt.hash(newAdmin.password,salt);
    newAdmin = await newAdmin.save()
     newAdmin.save().then(result=>{
         res.json(result);
     }).catch(err=>{
      res.json(err);
     })

 });
router.post("/loginadmin", (req, res) => {
  Admin.find({ phoneNumber: req.body.phoneNumber })
    .exec()
    .then(admin => {
      if (admin.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: admin[0].email,
              userId: admin[0]._id
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

router.get("/allusers",auth,(req,res)=>{
	Customer.find().then(result=>{
		res.send(result);
	}).catch(err=>{
		res.send(err);
	})
});

router.get("/allstores",auth,(req,res)=>{
	Shop.find().then(result=>{
		res.send(result);
	})
})

router.delete("/:shopid",auth,(req,res)=>{
    const id = req.params.shopid;
  const shop = Shop.findById({_id:id});
   Shop.remove({id:req.params._id}).then(result=>{
     res.json({
      status: "deleted succesfully",
      result:result
     })
   }).catch(err=>{
    res.json(err);
   })
})

router.delete("/:customerid",auth,(req,res)=>{
    const id = req.params.customerid;
  const customer = Customer.findById({_id:id});
   Customer.remove({id:req.params._id}).then(result=>{
     res.json({
      status: "deleted succesfully",
      result:result
     })
   }).catch(err=>{
    res.json(err);
   })
})

router.patch("/:myid",auth, (req, res, next) => {
  const id = req.params.myid;
  const admin = Admin.findById({_id:id});
  if(req.admin = id){
         const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Admin.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'updated',
          result:result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
        
  }
  else{
   
   res.json("permission denied");
 
  }
});

module.exports = router;