const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const donationRoutes = require("./donationRoutes");

router.use("/auth", authRoutes);
router.use("/donation", donationRoutes);

module.exports = router;
