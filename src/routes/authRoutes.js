const express = require("express");
const { check } = require("express-validator");
const {
  loginUser,
  registerUser,
  thirdPartyAuthCallback,
} = require("../controllers/authController");
const router = express.Router();
const passport = require("../strategies/passport");

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

// GitHub Authentication
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    // successRedirect: "/profile",
    // failureRedirect: "/login",
    session: false,
  }),
  thirdPartyAuthCallback
);

// Google Authentication
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  thirdPartyAuthCallback
);

// Facebook Authentication
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

router.get("/failure", (req, res) => {
  return res.send("something went wrong...");
});

module.exports = router;
