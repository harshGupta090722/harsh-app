import jwt from "jsonwebtoken";
import config from "../config.js";

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  //In PostMan-when user purchases a course at this route,
  //1)We need to pass course id in header, 
  //2)In header>authorization we need paas token as Bearer type.(we copy token from login request)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided" });
  }
  const token = authHeader.split(" ")[1];//splits the string into array of size 2,using " " as a delimeter.

  try {
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
    console.log(decoded);
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("error in user middleware", error);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
}

export default userMiddleware;