const express = require("express");
const router = express.Router();
const FaqController = require("../controller/homecontroller/faqController");
const { isAuthenticated, authorizeRoles } = require("../middleware/Auth");

router.post("/faq", isAuthenticated, FaqController.createFaq);
router.get("/faq", isAuthenticated, FaqController.getFaqs);
router.get("/faq/:id", isAuthenticated, FaqController.getFaqById);
router.put("/faq/:id", isAuthenticated, FaqController.updateFaq);
router.delete(
  "/faq/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  FaqController.deleteFaq
);

module.exports = router;
