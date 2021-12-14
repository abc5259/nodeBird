const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const {
  stayLogIn,
  signUp,
  logIn,
  logOut,
} = require("../controller/userController");

const router = express.Router();

router.get("/", stayLogIn);
router.post("/", isNotLoggedIn, signUp);
router.post("/login", isNotLoggedIn, logIn);
router.post("/logout", isLoggedIn, logOut);

module.exports = router;
