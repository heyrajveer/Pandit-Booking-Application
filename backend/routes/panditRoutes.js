const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const panditController = require("../controllers/panditController");

// pandit creation
router.post("/create", verifyToken, roleMiddleware("pandit"), panditController.createPandit);

// get all pandits
router.get("/", panditController.getPandits);

// get pandit by id
router.get("/:id", panditController.getPanditById);


//personal dashboard pandit profle 
router.get("/profile/me", verifyToken, roleMiddleware("pandit"), panditController.getMyPanditProfile);

// update pandit profile
router.put("/profile/update", verifyToken, roleMiddleware("pandit"), panditController.updatePanditProfile);

// delete pandit
router.delete("/:id", verifyToken, roleMiddleware("pandit"), panditController.deletePandit);

module.exports = router;