module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //MySQL에는 users 테이블 생성
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      charser: "utf8",
      collate: "utf8_general_ci", //한글 저장되게 안하면 오류
    }
  );
  User.associate = db => {
    //hasOne -> 일대일 관계
    db.User.hasMany(db.Post); //일대 다 관계
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //좋아요 관계
    //through는 테이블 아이디를 바꿔주는 것 foreignKey는 컬럼을 바꿔주는 것?
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
