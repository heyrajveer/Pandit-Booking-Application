const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const panditController = require("../controllers/panditController");


// get all pandits
router.get("/", panditController.getPandits);

// pandit creation
router.post("/create", verifyToken, roleMiddleware("pandit"), panditController.createPandit);

//personal dashboard pandit profle 
router.get("/profile", verifyToken, roleMiddleware("pandit"), panditController.getMyPanditProfile);

// update pandit profile
router.put("/update", verifyToken, roleMiddleware("pandit"), panditController.updatePanditProfile);





// get pandit by id
router.get("/:id", panditController.getPanditById);

// delete pandit
router.delete("/:id", verifyToken, roleMiddleware("pandit"), panditController.deletePandit);

router.get("/",panditController.getPanditByCity);
module.exports = router;