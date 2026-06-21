const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get(
    "/verify/:id",
    authController.verifyEmail
);


module.exports = router;