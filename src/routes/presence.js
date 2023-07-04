const express = require("express");
const PresenceController = require("../controllers/presence");

const router = express.Router();

router.get("/", PresenceController.GetAllPresences);
router.post("/search", PresenceController.SearchPresence);
router.post("/add", PresenceController.AddPresence);
router.post("/update", PresenceController.UpdatePresence);
router.post("/delete", PresenceController.DeletePresence);

module.exports = router;
