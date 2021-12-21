const { Op } = require("sequelize/dist");
const { User, Post, Comment, Image, Hashtag } = require("../models");

exports.getHashtagPosts = async (req, res, next) => {
  try {
    const { hashtag } = req.params;
    const { lastId } = req.query;
    const where = {};
    if (+lastId) {
      where.id = { [Op.lt]: +lastId }; //Id가 lastId보다 작은
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(hashtag) },
        },
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
