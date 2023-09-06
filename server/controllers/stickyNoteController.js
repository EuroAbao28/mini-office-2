const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stickyNoteModel = require("../models/stickyNoteModel");

const getStickyNotes = async (req, res) => {
  try {
    const stickyNotes = await stickyNoteModel.find({ user: req.user.id });
    res.status(200).json(stickyNotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Try catch error: ${error}` });
  }
};

const createStickyNote = async (req, res) => {
  const { title, body, color } = req.body;

  if (!title || !body || !color)
    return res.json({ message: "All fields are required" });

  try {
    await stickyNoteModel.create({ user: req.user.id, title, body, color });
    res.status(201).json({ message: "New Sticky note added" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Try catch error: ${error}` });
  }
};

const updateStickyNote = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  // AYUSIN MO PA TO
  // IDAGDAG MO YUNG MIDDLEWARE
  // DAPAT YUNG USER LANG NA NAKA LOGIN ANG PWEDE MAG UPDATE SA SARILI NYANG NOTES

  try {
    const updatedStickyNote = await stickyNoteModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );

    if (!updatedStickyNote) {
      return res.status(404).json({ message: "Sticky note not found" });
    }

    res.json(updatedStickyNote);
  } catch (error) {
    console.log(`Try catch error ${error}`);
    res.json({ message: error });
  }
};

const deleteStickyNote = async (req, res) => {
  res.send("delete sticky note");
};

module.exports = {
  getStickyNotes,
  createStickyNote,
  updateStickyNote,
  deleteStickyNote,
};
