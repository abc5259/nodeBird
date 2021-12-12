module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      //MySQL에는 Posts 테이블 생성
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charser: "utf8mb4", //이모티콘까지 가능하게
      collate: "utf8mb4_general_ci", //한글 저장되게 안하면 오류
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User); //belongsTo가 있는 모델에 해당 모델의 아이디가 컬럼(UserId)으로 생긴다.
    db.Post.belongsToMany(db.Hashtag);
    // db.Post.belongsTo(db.User)이 있으니깐 구별을 위해 as를 써준다.
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); //좋아요 관계
    //as를 안해주면 컬럼에 PostId가 생기는데 이미 있으니깐 as로 이름을 변경 할 수 있다.
    db.Post.belongsTo(db.Post, { as: "Retweet" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
  };
  return Post;
};
