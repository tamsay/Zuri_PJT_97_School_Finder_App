var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

// User Model
const User = require("../models/userSchema");

/* GET users listing. */
router.get("/", ensureAuthenticated, (req, res) => {
  res.send("respond with a resource");
});

// Login Page
router.get("/login", (req, res) => {
  res.status(200).send("Login Page");
});

// Register Page
router.get("/register", (req, res) => {
  res.status(200).send("Register Page");
});

// Register Handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(400).json({
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User exists
        errors.push({ msg: "Email is already registered" });
        res.status(400).json({
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Mash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then((user) => {
                res.status(200).send("You are now registered");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
  res.status(200).send("You are logged in");
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("You logged out");
});

module.exports = router;
