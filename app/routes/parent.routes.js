const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parent/configuration.controller.js");

// Routes for Parent

router.get("/parents", parentController.findAllParents);
router.get("/:parentId", parentController.findParentById);
router.put("/:parentId", parentController.updateParent);
router.delete("/:parentId", parentController.deleteParent);
router.put("/:parentId/desactiver", parentController.disableParentAccount);
router.put("/:parentId/reactiver", parentController.enableParentAccount);

module.exports = router;
