const express = require("express");
const router = express.Router();
const retreatController = require("../controller/retreat/retreatController");

// Create a new retreat
router.post("/retreats", retreatController.createRetreat);

// Get all retreats
router.get("/retreats/all", retreatController.getRetreats);

// Get a retreat by ID
router.get("/retreats/:id", retreatController.getRetreatById);

// Update a retreat by ID
router.put("/update/retreats/:id", retreatController.updateRetreat);

// Delete a retreat by ID
router.delete("/delete/retreats/:id", retreatController.deleteRetreat);

module.exports = router;
