const { Post, User, Image, Comment } = require("../models");

exports.loadPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // where: {id: lastId},
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        { model: User, as: "Likers", attributes: ["id"] }, //좋아요 누른 사람
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
