import { Form, Input } from "antd";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import user from "../../back/models/user";
import useInput from "../hooks/useInput";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [nickname, onchangeNickname] = useInput(me?.nickname || "");
  const style = useMemo(
    () => ({
      marginTop: "20px",
      border: "1px solid #d9d9d9",
      padding: "20px",
    }),
    []
  );
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onchangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
