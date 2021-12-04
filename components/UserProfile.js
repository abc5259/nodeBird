import { Avatar, Button, Card } from "antd";
import { useCallback } from "react";

const UserProfile = ({ setIsLoggendIn }) => {
  const onLoggout = useCallback(() => {
    setIsLoggendIn(false);
  }, []);
  return (
    <>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />0
          </div>,
          <div key="followings">
            팔로잉
            <br />0
          </div>,
          <div key="followers">
            팔로워
            <br />0
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>JH</Avatar>} title="LeeJaeHoon" />
        <Button onClick={onLoggout}>로그아웃</Button>
      </Card>
    </>
  );
};

export default UserProfile;
