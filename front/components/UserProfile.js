import { useCallback } from "react";
import { Avatar, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import { useSelector } from "react-redux";
import Link from "next/link";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { logOutLoading } = useSelector(state => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <>
      <Card
        actions={[
          <Link href={`/user/${me.id}`}>
            <a>
              <div key="twit">
                짹짹
                <br />
                {me.Posts.length}
              </div>
            </a>
          </Link>,
          <Link href={`/profile`}>
            <a>
              <div key="followings">
                팔로잉
                <br />
                {me.Followings.length}
              </div>
            </a>
          </Link>,
          <Link href={`/profile`}>
            <a>
              <div key="followers">
                팔로워
                <br />
                {me.Followers.length}
              </div>
            </a>
          </Link>,
        ]}
      >
        <Card.Meta
          avatar={
            <Link href={`/user/${me.id}`}>
              <a>
                <Avatar>{me.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={me.nickname}
        />
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </Card>
    </>
  );
};

export default UserProfile;
