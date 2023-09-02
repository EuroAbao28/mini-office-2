const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is reqruired"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);