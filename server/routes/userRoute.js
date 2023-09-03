const express = require("express");
const {
  checkUserToken,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/checkusertoken", checkUserToken);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
