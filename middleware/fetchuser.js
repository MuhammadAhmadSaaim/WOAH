const jwt = require("jsonwebtoken");
JWT_SECRET='byali'; 

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }
  };
  
  module.exports = fetchUser;
