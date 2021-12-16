const { Post, Comment, Image, User, Hashtag } = require("../models");

exports.createComment = async (req, res, next) => {
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

exports.createPost = async (req, res, next) => {
  try {
    const { content, image } = req.body;
    const { id: UserId } = req.user;
    const hashtags = content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content,
      UserId,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(hashtag =>
          Hashtag.findOrCreate({
            where: { name: hashtag.slice(1).toLowerCase() },
          })
        )
      ); // [[노드,true],[리액트,true]]
      await post.addHashtags(result.map(v => v[0]));
    }
    if (image) {
      if (Array.isArray(image)) {
        // 이미지를 여러개 올리면 image: ["이.png", "재.png"]
        const dbImages = await Promise.all(
          image.map(imagePath => Image.create({ src: imagePath }))
        );
        console.log(dbImages);
        await post.addImages(dbImages);
      } else {
        // 이미지를 하나만 올리면 image: "이.png"
        const dbImage = await Image.create({ src: image });
        await post.addImages(dbImage);
      }
    }
    console.log(post.getImages());
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
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
    return res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
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

exports.unlikePost = async (req, res, next) => {
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

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id: UserId } = req.user;
    await Post.destroy({
      where: { id: postId, UserId },
    });
    return res.status(200).json({ PostId: +postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.postImages = (req, res, next) => {
  return res.json(req.files.map(v => v.filename));
};

exports.retweet = async (req, res, next) => {
  const { postId } = req.params;
  const { id: myId } = req.user;
  const post = await Post.findOne({
    where: { id: postId },
    include: [{ model: Post, as: "Retweet" }],
  });
  if (!post) {
    return res.status(403).send("게시글이 존재하지 않습니다.");
  }
  if (myId === post.UserId || (post.Retweet && post.Retweet.UserId === myId)) {
    return res.status(403).send("자신의 글은 리트윗할 수 없습니다.");
  }
  const retweetTargetId = post.RetweetId || post.id;
  const exPost = await Post.findOne({
    where: { UserId: myId, RetweetId: retweetTargetId },
  });
  if (exPost) {
    return res.status(403).send("이미 리트윗 했습니다.");
  }
  const retweet = await Post.create({
    content: "retweet",
    RetweetId: retweetTargetId,
    UserId: myId,
  });
  const retweetWithPrevPost = await Post.findOne({
    where: { id: retweet.id },
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
      { model: Image },
      {
        model: Comment,
        include: [{ model: User, attributes: ["id", "nickname"] }],
      },
      { model: User, as: "Likers", attributes: ["id"] },
    ],
  });
  return res.status(201).json(retweetWithPrevPost);
};
