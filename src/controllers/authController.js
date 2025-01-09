const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken");
const { prisma } = require("../db/prismaClient");
const { handleThirdPartyLogin } = require("../services/authService");
const { use } = require("passport");

const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user; // remove password
  return sanitizedUser;
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;
  console.log(firstName, lastName, email, password, dateOfBirth);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        dateOfBirth: new Date(dateOfBirth),
        password: hashedPassword,
        provider: "local",
        providerId: null,
      },
    });
    const token = generateToken(user.id);

    const sanitizedUser = sanitizeUser(user);
    res.status(201).json({ message: "User created", token: token });
    // res.status(201).json({ token, user: sanitizedUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};

const checkUserExists = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      return res
        .status(200)
        .json({ message: "Can proceed with Signup", email: email });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user.id);

    const sanitizedUser = sanitizeUser(user);

    res.json({ token, user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const thirdPartyAuthCallback = async (req, res) => {
  try {
    if (!req.user) {
      console.log("No user found in req.user");
      return res.status(400).json({ message: "Authentication failed" });
    }
    const { user } = req;
    const token = generateToken(user.id);
    const sanitizedUser = sanitizeUser(user);

    res.redirect(`${process.env.CLIENT_APP_URL}//login-success?token=${token}`);
    // res.status(200).json({ token, user: sanitizedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  thirdPartyAuthCallback,
  checkUserExists,
};
