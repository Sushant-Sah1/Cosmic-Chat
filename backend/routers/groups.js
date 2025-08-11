const express = require("express");
const { joingroup, creategroup, joinedgroups, prevmessages, exitgroup, updategroup, searchprivgroup, searchpubgroup } = require("../controllers/groupController");
const router = express.Router();

router.post("/joingroup", joingroup);
router.post("/creategroup", creategroup);
router.post("/searchprivgroup", searchprivgroup);
router.post("/joinedgroups", joinedgroups);
router.post("/prevmessages", prevmessages);
router.post("/exitgroup", exitgroup);
router.post("/updategroup", updategroup);
router.post("/searchpubgroup", searchpubgroup);

module.exports=router