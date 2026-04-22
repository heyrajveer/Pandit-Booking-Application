import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
   console.log("👉 Cookies:", req.cookies);
  console.log("👉 AccessToken:", req.cookies?.accessToken);
  const token = req.cookies?.accessToken;

  if (!token) {
     console.log("❌ No token received");
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("✅ Token decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
      console.log("❌ Invalid token");
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

