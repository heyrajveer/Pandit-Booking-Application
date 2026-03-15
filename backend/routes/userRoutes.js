const express =require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");
const router =express.Router();


router.get("/profile",verifyToken,userController.getUserProfile);
router.put("/profile",verifyToken,userController.updateUserProfile);
module.exports =router;