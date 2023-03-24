import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import useChatState from "@/hooks/useChatState";
import useToast from "@/hooks/useToast";
import { userState } from "@/recoil/atoms/userState";
import { joinChatRoomRequest } from "@/apis/chat";
import { RoomListProps } from "@/types/chat";

const RoomList = ({ roomList }: RoomListProps) => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const { toast } = useToast();
  const { setChat } = useChatState();

  const handleRoomClick = async (roomId: string) => {
    if (!userId) return;

    const res = await joinChatRoomRequest(roomId, userId);
    if (res.success) {
      if (res.result.canParticipant) {
        setChat((prev) => {
          return { ...prev, roomId: roomId };
        });
        router.push(`/chat/${roomId}`);
      }
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <RoomListContainer>
      {roomList.map((room) => {
        return (
          <Room key={room.roomId} onClick={() => handleRoomClick(room.roomId)}>
            <RoomInfoContainer>
              <RoomInfo>
                <RoomGame>리그 오브 레전드</RoomGame>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomMemberCount>
                  {room.currentMember} / {room.maximumMember}
                </RoomMemberCount>
              </RoomInfo>
            </RoomInfoContainer>
          </Room>
        );
      })}
    </RoomListContainer>
  );
};

export default RoomList;

const RoomListContainer = tw.ul`
  w-full
`;

const Room = tw.li`
  relative inline-block w-[20%] pt-[20%] text-center cursor-pointer
`;

const RoomInfoContainer = tw.div`
  absolute flex flex-col top-0 left-0 right-0 bottom-0 p-4
`;

const RoomInfo = tw.div`
  flex flex-col w-full h-full shadow bg-white/10
`;

const RoomGame = tw.span`
  border-b border-neutral-700
`;

const RoomTitle = tw.span`
  pt-4 h-full text-3xl
`;

const RoomMemberCount = tw.div`
 text-4xl
`;
