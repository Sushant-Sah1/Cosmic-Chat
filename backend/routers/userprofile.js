const express = require("express");
const { updateprofile } = require("../controllers/userprofileController");

const router = express.Router();

router.post("/updateprofile", updateprofile);

module.exports=router