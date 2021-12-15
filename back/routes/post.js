const express = require("express");
const {
  createComment,
  createPost,
  likePost,
  unlikePost,
  deletePost,
} = require("../controller/postController");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, createPost);
router.post("/:postId/commnet", isLoggedIn, createComment);
router.patch("/:postId/like", isLoggedIn, likePost);
router.delete("/:postId/like", isLoggedIn, unlikePost);
router.delete("/:postId", isLoggedIn, deletePost);

module.exports = router;
