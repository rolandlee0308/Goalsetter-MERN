const express = require("express");
const router = express.Router();
const { registerUser, getUserData, loginUser } = require("../controllers/user");
const { protect } = require("../middlewares/auth");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);

module.exports = router;
