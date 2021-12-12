module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      //MySQL에는 Hashtags 테이블 생성
      // id가 기본적으로 들어있다.
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
    },
    {
      charser: "utf8mb4", //이모티콘까지 가능하게
      collate: "utf8mb4_general_ci", //한글 저장되게 안하면 오류
    }
  );
  Hashtag.associate = db => {
    db.Hashtag.belongsToMany(db.Post);
  };
  return Hashtag;
};
