const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMdlwr = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.substring("Bearer ".length);

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token", decodedToken);

      req.user = await userModel.findById(decodedToken.id);
      console.log("req.user", req.user);

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
};

module.exports = authMdlwr;
