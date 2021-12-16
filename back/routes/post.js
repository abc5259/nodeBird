const express = require("express");
const multer = require("multer");
const path = require("path");

const upload = multer({
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

const {
  createComment,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  postImages,
} = require("../controller/postController");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, upload.none(), createPost);
router.post("/:postId/commnet", isLoggedIn, createComment);
router.patch("/:postId/like", isLoggedIn, likePost);
router.delete("/:postId/like", isLoggedIn, unlikePost);
router.delete("/:postId", isLoggedIn, deletePost);
router.post("/images", isLoggedIn, upload.array("image"), postImages);

module.exports = router;
