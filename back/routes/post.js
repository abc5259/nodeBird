const express = require("express");
const multer = require("multer");
const {
  createComment,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  postImages,
  retweet,
  loadPost,
} = require("../controller/postController");
const { isLoggedIn, upload } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, upload.none(), createPost);
router.post("/:postId/commnet", isLoggedIn, createComment);
router.patch("/:postId/like", isLoggedIn, likePost);
router.delete("/:postId/like", isLoggedIn, unlikePost);
router.delete("/:postId", isLoggedIn, deletePost);
router.post("/images", isLoggedIn, upload.array("image"), postImages);
router.post("/:postId/retweet", isLoggedIn, retweet);
router.get("/:postId", loadPost);

module.exports = router;
