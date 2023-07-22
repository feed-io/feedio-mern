const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { pathToRegexp } = require("path-to-regexp");

dotenv.config();

const UNPROTECTED_ROUTES = [
  "/api/users/register",
  "/api/users/login",
  "/api/users/:id/products/:pid/widgets/:wid/serve",
];

const isUnprotectedRoute = (path) => {
  for (let route of UNPROTECTED_ROUTES) {
    const regex = pathToRegexp(route);
    if (regex.test(path)) {
      return true;
    }
  }
  return false;
};

module.exports = (req, res, next) => {
  if (isUnprotectedRoute(req.path) || req.method === "OPTIONS") {
    return next();
  }

  let token = null;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      console.error("Error extracting token from Authorization header:", error);
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided in the request." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token provided." });
  }
};
