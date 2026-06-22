const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminAuth");


const {
  register,
  login,
  verifyEmail,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");


router.post("/register", register);
router.post("/login", login);
router.get(
    "/verify/:id",
    authController.verifyEmail
);

router.get(
    "/users",
    auth,
    admin,
    getAllUsers
);

router.delete(
    "/users/:id",
    auth,
    admin,
    deleteUser
);
module.exports = router;