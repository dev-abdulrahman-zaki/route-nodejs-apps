import jwt from "jsonwebtoken";

// check auth / verify token
export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.split(" ")[1] || null;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token", error: err });
    // add the decoded user to the request object
    req.user = decoded;
    next();
  });
};
