const express = require("express");
const { getmembers, checkmember } = require("../controllers/memberController");
const router = express.Router();

router.post("/getmembers", getmembers);
router.post("/checkmember", checkmember);

module.exports = router;
