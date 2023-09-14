const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const stickyNoteSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: reqString,
    body: reqString,
    color: reqString,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StickyNote", stickyNoteSchema);
