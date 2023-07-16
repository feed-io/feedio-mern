const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: No token provided" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Authentication failed: Error retrieving token" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
};
