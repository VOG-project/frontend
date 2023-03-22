import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import { chatState } from "@/recoil/atoms/chatState";
import { joinChatRoomRequest } from "@/apis/chat";
import { RoomListProps } from "@/types/chat";

const RoomList = ({ roomList }: RoomListProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const setChat = useSetRecoilState(chatState);
  const handleRoomClick = async (roomId: string) => {
    const res = await joinChatRoomRequest({ roomId, userId: 11 });
    if (res.success) {
      if (res.result.canParticipant) {
        setChat((prev) => {
          return { ...prev, roomId: roomId };
        });
        router.push(`/chat/${roomId}`);
      }
    } else {
      toast.alert(res.data.error);
    }
  };
  return (
    <RoomListContainer>
      {roomList.map((room) => {
        return (
          <Room key={room.roomId} onClick={() => handleRoomClick(room.roomId)}>
            <RoomGame>리그오브레전드</RoomGame>
            <RoomTitle>{room.title}</RoomTitle>
            <RoomOwner>{room.title}</RoomOwner>
            <RoomMemberCount>
              {room.currentMember} / {room.maximumMember}
            </RoomMemberCount>
          </Room>
        );
      })}
    </RoomListContainer>
  );
};

export default RoomList;

const RoomListContainer = tw.section`
  border-y-2 border-neutral-700 divide-y divide-neutral-700
`;

const Room = tw.div`
  flex items-center w-full h-20 px-4 text-center cursor-pointer
`;

const RoomGame = tw.div`
  w-1/12
`;

const RoomTitle = tw.div`
  w-8/12 text-left
`;

const RoomOwner = tw.div`
  w-1/12
`;

const RoomMemberCount = tw.div`
  flex justify-center items-center w-1/12
`;
