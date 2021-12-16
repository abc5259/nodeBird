const multer = require("multer");
const path = require("path");
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // file.originalname 파일 이름 (이재훈.png)
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname); // 이름 추출 (이재훈)
      done(null, basename + "_" + new Date().getTime() + ext); // (이재훈213123123.png)
    },
  }),
  limits: { fieldSize: 20 * 1024 * 1024 }, // 20MB
});
