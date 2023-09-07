const express = require("express");
const {
  getStickyNotes,
  createStickyNote,
  updateStickyNote,
  deleteStickyNote,
} = require("../controllers/stickyNoteController");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.route("/").get(protect, getStickyNotes).post(protect, createStickyNote);
router
  .route("/:id")
  .patch(protect, updateStickyNote)
  .delete(protect, deleteStickyNote);

module.exports = router;
