const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      throw new Error("Error no token");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Authentication failed: " + error.message });
  }
};
