const { Post, Comment, Image, User } = require("../models");

module.exports.createComment = async (req, res, next) => {
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
};

module.exports.createPost = async (req, res, next) => {
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
          model: Comment, //댓글 작성자
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        { model: User, attributes: ["id", "nickname"] }, // 게시글 작성자
        { model: User, as: "Likers", attributes: ["id"] }, //좋아요 누른 사람
      ],
    });
    return res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { id: postId },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    return res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { id: postId },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    return res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
