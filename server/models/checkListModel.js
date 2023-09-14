const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const checkListSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: reqString,
    isDone: { type: Boolean, required: true },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("CheckList", checkListSchema);
