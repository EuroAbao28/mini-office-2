const express = require("express");
const {
  getCheckList,
  updatedCheckList,
  createCheckList,
  deleteCheckList,
} = require("../controllers/checkListController");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.route("/").get(protect, getCheckList).post(protect, createCheckList);
router
  .route("/:id")
  .patch(protect, updatedCheckList)
  .delete(protect, deleteCheckList);

module.exports = router;
