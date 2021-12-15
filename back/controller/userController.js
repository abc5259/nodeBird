const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");

exports.stayLogIn = async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  const { email, password, nickname } = req.body;
  try {
    const exUser = await User.findOne({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
      nickname,
    });
    // res.setHeader('Access-control-Allow-Origin', 'http://localhost:3000')
    return res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.logIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(error);
      return next(error);
    }
    if (info) {
      //401은 허가되지않음
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginError => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
};

exports.logOut = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
};

exports.updateNickname = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { nickname } = req.body;
    console.log(nickname);
    await User.update(
      {
        nickname,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.follow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(403).send("없는 사람을 팔로우하려고 하시네요?");
    }
    await user.addFollowers(req.user.id);
    return res.status(200).json({ UserId: +userId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unFollow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(403).send("없는 사람을 언팔로우하려고 하시네요?");
    }
    await user.removeFollowers(req.user.id);
    return res.status(200).json({ UserId: +userId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.removeFollower = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const me = await User.findOne({ where: { id } });
    if (!me) {
      return res.status(403).send("누구시죠?");
    }
    await me.removeFollowers(userId);
    return res.status(200).json({ UserId: +userId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send("없는 사람을 언팔로우하려고 하시네요?");
    }
    const followers = await user.getFollowers();
    return res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getFollowings = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send("없는 사람을 언팔로우하려고 하시네요?");
    }
    const followings = await user.getFollowings();
    return res.status(200).json(followings);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
