const express = require("express");
const postRouter = require("./routes/post.js");
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
app.get("/", (req, res) => {
  res.send("Hi");
});
app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
