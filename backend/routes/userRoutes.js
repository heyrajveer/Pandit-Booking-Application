import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  uploadUserProfileImage,
} from "../controllers/userController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.post(
  "/upload-profile-image",
  verifyToken,
  upload.single("profileImage"),
  uploadUserProfileImage
);

export default router;