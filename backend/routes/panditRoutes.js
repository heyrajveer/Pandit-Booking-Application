import express from "express";
import multer from "multer";
import {verifyToken }from "../middlewares/authMiddleware.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";

import {
  createPandit,
  getPandits,
  getMyPanditProfile,
  updatePanditProfile,
  uploadPanditProfileImage,
  getPanditById,
  deletePandit,
  getPanditByCity
} from "../controllers/panditController.js";

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

// get all pandits
router.get("/", getPandits);

// pandit creation
router.post("/create", verifyToken, roleMiddleware("pandit"), createPandit);

// personal dashboard pandit profile 
router.get("/profile", verifyToken, roleMiddleware("pandit"), getMyPanditProfile);

// update pandit profile
router.put("/update", verifyToken, roleMiddleware("pandit"), updatePanditProfile);

// upload profile image
router.post(
  "/upload-profile-image",
  verifyToken,
  roleMiddleware("pandit"),
  upload.single("profileImage"),
  uploadPanditProfileImage,
);

// ⚠️ IMPORTANT: place this BEFORE /:id
router.get("/city/search", getPanditByCity);

// get pandit by id
router.get("/:id", getPanditById);

// delete pandit
router.delete("/:id", verifyToken, roleMiddleware("pandit"), deletePandit);

// ✅ Correct export
export default router;