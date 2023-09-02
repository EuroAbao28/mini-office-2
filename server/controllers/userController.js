const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exist in db
  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({ message: "User successfully created" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find user from db
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res
      .status(200)
      .json({ message: "Login successfully", token: generateToken(user) });
  } else {
    return res.status(400).json({ message: "Incorrect email or password" });
  }
};

// Generate JWT
const generateToken = (userData) => {
  const payload = [userData.email, userData.password];
  return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = { registerUser, loginUser };