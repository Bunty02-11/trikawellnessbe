const express = require("express");
const router = express.Router();
const IntroductionController = require("../controller/homecontroller/introductionController");
const { isAuthenticated, authorizeRoles } = require("../middleware/Auth");

router.post("/introduction", isAuthenticated, IntroductionController.createIntroduction);
router.get("/introduction", IntroductionController.getIntroductions);
router.get("/introduction/:id", IntroductionController.getIntroductionById);
router.put("/introduction/:id", isAuthenticated, IntroductionController.updateIntroduction);
router.delete(
  "/introduction/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  IntroductionController.deleteIntroduction
);

module.exports = router;