const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const {
  stayLogIn,
  signUp,
  logIn,
  logOut,
  updateNickname,
  follow,
  unFollow,
  getFollowers,
  getFollowings,
  removeFollower,
  getUserPosts,
} = require("../controller/userController");

const router = express.Router();

router.get("/", stayLogIn);
// post
router.get("/:userId/posts", getUserPosts);

router.post("/", isNotLoggedIn, signUp);
router.post("/login", isNotLoggedIn, logIn);
router.post("/logout", isLoggedIn, logOut);
router.patch("/nickname", isLoggedIn, updateNickname);
//follow
router.get("/followers", isLoggedIn, getFollowers);
router.get("/followings", isLoggedIn, getFollowings);
router.patch("/:userId/follow", isLoggedIn, follow);
router.delete("/:userId/follow", isLoggedIn, unFollow);
router.delete("/follower/:userId", isLoggedIn, removeFollower);

module.exports = router;
