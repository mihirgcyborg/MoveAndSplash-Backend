const express = require("express");
const { check } = require("express-validator");
const { loginUser, registerUser } = require("../controllers/authController");
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password should be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

module.exports = router;
