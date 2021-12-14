const express = require("express");
const { Post, Comment, Image, User } = require("../models");
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
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        { model: User, attributes: ["id", "nickname"] },
      ],
    });
    return res.status(201).json(fullPost);
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
      user: { id: UserId },
    } = req;
    const post = await Post.findOne({ where: { id: PostId } });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content,
      PostId: +PostId,
      UserId,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    return res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
