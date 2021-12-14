const express = require("express");
const { createComment, createPost } = require("../controller/postController");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, createPost);
router.post("/:postId/commnet", isLoggedIn, createComment);

module.exports = router;
