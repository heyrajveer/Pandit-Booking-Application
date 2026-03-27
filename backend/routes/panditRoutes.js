import express from "express";
import {verifyToken }from "../middlewares/authMiddleware.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";

import {
  createPandit,
  getPandits,
  getMyPanditProfile,
  updatePanditProfile,
  getPanditById,
  deletePandit,
  getPanditByCity
} from "../controllers/panditController.js";

const router = express.Router();

// get all pandits
router.get("/", getPandits);

// pandit creation
router.post("/create", verifyToken, roleMiddleware("pandit"), createPandit);

// personal dashboard pandit profile 
router.get("/profile", verifyToken, roleMiddleware("pandit"), getMyPanditProfile);

// update pandit profile
router.put("/update", verifyToken, roleMiddleware("pandit"), updatePanditProfile);

// ⚠️ IMPORTANT: place this BEFORE /:id
router.get("/city/search", getPanditByCity);

// get pandit by id
router.get("/:id", getPanditById);

// delete pandit
router.delete("/:id", verifyToken, roleMiddleware("pandit"), deletePandit);

// ✅ Correct export
export default router;