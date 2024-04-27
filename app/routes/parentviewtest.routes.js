const express = require("express");
const router = express.Router();
const testController = require("../controllers/parent/test.controller.js");

// Routes for Tests

router.get("/tests", testController.findAllTests);
router.get("/tests/:testId", testController.findOne);

module.exports = router;