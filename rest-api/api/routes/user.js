const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: `this is user get request`
//   })
// })

router.post("/", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash));
  if(err) {
    return res.status(500).json({
      error: err,
    });
  } else {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password:hash,
    phone: req.body.phone,
    gender: req.body.gender,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newSdonar: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  }
});


// router.post("/", (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, (err, hash));
//   if(err) {
//     return res.status(500).json({
//       error: err,
//     });
//   } else {
//     const user = new User({
//       fullname: req.body.fullname,
//       password: hash,
//       phone: req.body.phone,
//       email: req.body.email,
//       gender: req.body.gender,
//     });
//     user
//       .save()
//       .then(result => {
//         res.status(200).json({
//           new_user: result,
//         });
//       })

//       .catch(err => {
//         res.status(500).json({
//           error: err,
//         });
//       });
//   }
// });

module.exports = router;
