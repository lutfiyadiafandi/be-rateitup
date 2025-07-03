const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // support "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Unauthenticated" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const authorizeRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: "Role access denied" });
    }
    next();
  };

module.exports = {
  verifyToken,
  authorizeRole,
};
