import tw from "twin.macro";
import { RoomListProps } from "@/types/chat";

const RoomList = ({ roomList, handleRoomClick }: RoomListProps) => {
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

const RoomGame = tw.div`
  border-b border-neutral-700
`;

const RoomTitle = tw.div`
  pt-4 h-full text-3xl
`;

const RoomMemberCount = tw.div`
 text-4xl
`;
