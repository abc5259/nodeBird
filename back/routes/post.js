const express = require("express");
const { Post, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id: UserId } = req.user;
    const post = await Post.create({
      content,
      UserId,
    });
    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/commnet", isLoggedIn, async (req, res, next) => {
  try {
    const {
      body: { content },
      params: { postId: PostId },
      id: { UserId },
    } = req;
    const comment = await Comment.create({
      content,
      PostId,
      UserId,
    });
    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
