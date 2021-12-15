const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const {
  stayLogIn,
  signUp,
  logIn,
  logOut,
  updateNickname,
} = require("../controller/userController");

const router = express.Router();

router.get("/", stayLogIn);
router.post("/", isNotLoggedIn, signUp);
router.post("/login", isNotLoggedIn, logIn);
router.post("/logout", isLoggedIn, logOut);
router.patch("/nickname", isLoggedIn, updateNickname);

module.exports = router;
