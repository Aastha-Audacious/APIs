const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Donar = require("../model/donar");

//Getting all info from the collection
router.get("/", (req, res, next) => {
  Donar.find()
    .then((result) => {
      res.status(200).json({
        donarData: result,
      });
    })

    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  //   res.status(200).json({
  //     msg: `this is donar get request`,
  //   });
});

//find by id or any particular document from the collection
router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Donar.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        donar: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//Inserting data from the postman or user end
router.post("/", (req, res, next) => {
  const donar = new Donar({
    // _id: mongoose.Schema.Types.ObjectId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
  });

  donar
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newDonar: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//   res.status(200).json({
//     msg: `this is donar post request`
//   })
//   console.log(req.body.email);

//delete request
router.delete("/:id", (req, res, next) => {
  Donar.deleteMany({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: `Donar Deleted Successfully`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//put request
router.put("/:id", (req, res, next) => {
  console.log(req.params.id);
  Donar.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
      },
    }
  )
    .then((result) => {
    //   console.log(result);
      res.status(200).json({
        updated_donar: `Donar Updated Successfully`,
      });
    })
    .catch((err) => {
        console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
