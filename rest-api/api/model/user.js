const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: { type: String, required: true },
  confirmPassword: String,
});

module.exports = mongoose.model("user", userSchema);
