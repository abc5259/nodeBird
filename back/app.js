const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post.js");
const userRouter = require("./routes/user.js");
const db = require("./models");
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });
app.use(
  cors({
    origin: true,
    credentials: false,
  })
); // argumnet로 {origin: true}로 해주면 *대신 보낸곳의 주소가 자동으로 들어간다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hi");
});
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
