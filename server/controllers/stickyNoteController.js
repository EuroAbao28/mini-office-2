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

  try {
    const stickyNoteData = await stickyNoteModel.findById({ _id: id });

    if (stickyNoteData) {
      // Check if the user id stickynote and current logged in user id is matched
      if (stickyNoteData.user.toString() === req.user._id.toString()) {
        const updatedStickyNote = await stickyNoteModel.findByIdAndUpdate(
          id,
          data,
          {
            new: true,
          }
        );
        if (!updatedStickyNote) {
          return res
            .status(404)
            .json({ message: "It's your sticky note, but there is an error" });
        }
        res.status(201).json({ message: "Sticky note updated successfully" });
      } else {
        return res.status(400).json({ message: "That's not your sticky note" });
      }
    } else {
      return res.status(404).json({
        message: "Sticky note not found",
      });
    }
  } catch (error) {
    console.log(`Try catch error ${error}`);
    res.json({ message: error });
  }
};

const deleteStickyNote = async (req, res) => {
  const id = req.params.id;

  try {
    const stickyNoteData = await stickyNoteModel.findById({ _id: id });

    if (stickyNoteData) {
      // Check if the user id stickynote and current logged in user id is matched
      if (stickyNoteData.user.toString() === req.user._id.toString()) {
        const deleteStickyNote = await stickyNoteModel.findByIdAndRemove({
          _id: id,
        });
        if (!deleteStickyNote) {
          return res
            .status(404)
            .json({ message: "It's your sticky note, but there is an error" });
        }
        res.status(200).json({ message: "Sticky note deleted successfully" });
      } else {
        return res.status(400).json({ message: "That's not your sticky note" });
      }
    } else {
      return res.status(404).json({
        message: "Sticky note not found",
      });
    }
  } catch (error) {
    console.log(`Try catch error ${error}`);
    res.json({ message: error });
  }
};

module.exports = {
  getStickyNotes,
  createStickyNote,
  updateStickyNote,
  deleteStickyNote,
};
