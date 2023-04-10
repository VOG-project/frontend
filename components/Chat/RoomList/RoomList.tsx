import tw from "twin.macro";
import { RoomListProps } from "@/types/chat";

const RoomList = ({ roomList, handleRoomClick }: RoomListProps) => {
  return (
    <RoomListContainer>
      {roomList.map((room) => {
        return (
          <Room key={room.roomId} onClick={() => handleRoomClick(room.roomId)}>
            <RoomInfo>
              <RoomTitle>{room.title}</RoomTitle>
              <RoomDescription>{room.description}</RoomDescription>
            </RoomInfo>
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

const RoomListContainer = tw.ul`
  grid grid-cols-2 gap-8 w-full
`;

const Room = tw.li`
  inline-block flex w-full h-28 text-center cursor-pointer shadow
`;

const RoomInfo = tw.div`
  items-center justify-center w-full h-full bg-zinc-900
`;

const RoomTitle = tw.div`
  flex items-center justify-center w-full h-2/3 text-3xl
`;

const RoomDescription = tw.div`
  flex items-center w-full h-1/3 text-left px-4 shadow bg-zinc-700
`;

const RoomMemberCount = tw.div`
  shrink-0 flex items-center justify-center w-1/5 text-4xl bg-stone-800
`;
