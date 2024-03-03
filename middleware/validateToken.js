import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "User is not Authorized" });
      } else {
        // Token is valid, attach the decoded payload to the request object
        req.user = decoded.user;
        next(); // Call the next middleware in the chain
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
