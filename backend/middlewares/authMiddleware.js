import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({
//             message: "Token required"
//         });
//     }

//     const token = authHeader.split(" ")[1];

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;

//         next();

//     } catch (error) {

//         return res.status(403).json({
//             message: "Invalid or expired token"
//         });

//     }
// };

