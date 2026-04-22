import express from "express";
import upload from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  uploadUserProfileImage,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

router.post(
  "/upload-profile-image",verifyToken,
  upload.single("profileImage"),
  uploadUserProfileImage
);

export default router;