const express = require("express");
const router = express.Router();
const controller = require("../controllers/candidate.controller");

router.get("/", controller.getAllCandidates);
router.get("/:id", controller.getCandidateById);
router.post("/", controller.createCandidate);
router.put("/:id", controller.updateCandidate);
router.delete("/:id", controller.deleteCandidate);

module.exports = router;
