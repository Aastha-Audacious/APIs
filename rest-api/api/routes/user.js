const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.get("/", (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json({
        userData: result,
      });
    })

    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  // res.status(200).json({
  //   message: `this is user get request`,
  // });
});


router.post('/signup', (req, res, next)=>{
    var username= req.body.username;
    var email= req.body.email;
    var password= req.body.password;
    var confirmPassword= req.body.confirmPassword;
    if(!password){
      return res.json({
        msg:`Please enter your password.`
      })
    }
    if(!confirmPassword){
      return res.json({
        msg:`Please Confirm your password.`
      })
    }

    if(password!=confirmPassword){
      return res.json({
        msg:`Password and confirm password should be same.`
      })
    }else{
      bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
          return res.json({
            msg:`Password required!`,
            error:err
          })
        }else{
          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });
    
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                msg: `User Registered Successfully`,
                new_user: result
              });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                error: error,
              });
            });
        }
      });
    }
});



router.post('/login', (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {    //array me milega isme 
      if (user.length < 1) {
        return res.status(404).json({
          msg: `You are not registered, please registered yourself first!`
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            msg: `Wrong password, please enter correct password!`,
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              email: user[0].email,
            },
            `this is dummy text`, //secret key for your token
            {
              expiresIn: "24h"  //expiry of token
            }
          );
          res.status(200).json({
            msg:`Login Successfully`,
            username: user[0].username,
            email: user[0].email,
            token: token
          })
        }
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
