import { useRecoilState, useResetRecoilState } from "recoil";
import { friendState } from "@/recoil/atoms/friendState";
import useToast from "./useToast";
import {
  addFriendRequest,
  removeFriendRequest,
  getFriendsRequest,
} from "@/apis/friend";

const useFriendState = () => {
  const [friend, setFriend] = useRecoilState(friendState);
  const resetFriend = useResetRecoilState(friendState);
  const { toast } = useToast();

  const handleFriendToggle = () => {
    setFriend((prev) => {
      return { ...prev, isShow: !prev.isShow };
    });
  };

  const updateFriendList = async (userId: number) => {
    const res = await getFriendsRequest(userId);

    if (res.success) {
      setFriend((prev) => {
        return { ...prev, friends: res.result };
      });
    } else {
      toast.alert(res.error);
    }
  };

  const handleRemoveFriendClick = async (
    userId: number | null,
    targetId: number | null
  ) => {
    if (!userId) return;
    if (!targetId) return;
    const res = await removeFriendRequest(userId, targetId);

    if (res.success) {
      await updateFriendList(userId);
    } else {
      toast.alert(res.error);
    }
  };

  const handleAddFriendClick = async (
    userId: number | null,
    targetId: number | null
  ) => {
    if (!userId) return;
    if (!targetId) return;
    const res = await addFriendRequest(userId, targetId);

    if (res.success) {
      await updateFriendList(userId);
    } else {
      toast.alert(res.error);
    }
  };

  const isShow = friend.isShow;
  const friends = friend.friends;
  const friendIds = friends.map((friend) => friend.following.id);

  return {
    friends,
    friendIds,
    isShow,
    setFriend,
    resetFriend,
    updateFriendList,
    handleFriendToggle,
    handleRemoveFriendClick,
    handleAddFriendClick,
  };
};

export default useFriendState;
