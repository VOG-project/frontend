import { useRecoilState } from "recoil";
import { friendState } from "@/recoil/atoms/friendState";

const useFriendState = () => {
  const [friend, setFriend] = useRecoilState(friendState);

  const handleFriendToggle = () => {
    setFriend((prev) => {
      return { ...prev, isShow: !prev.isShow };
    });
  };

  const isShow = friend.isShow;
  const friends = friend.friends;

  return { friends, isShow, setFriend, handleFriendToggle };
};

export default useFriendState;
