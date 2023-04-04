import tw from "twin.macro";
import { RoomListProps } from "@/types/chat";

const RoomList = ({ roomList, handleRoomClick }: RoomListProps) => {
  return (
    <RoomListContainer>
      {roomList.map((room) => {
        return (
          <Room key={room.roomId} onClick={() => handleRoomClick(room.roomId)}>
            <RoomInfo>
              {/* <RoomGame>발로란트</RoomGame> */}
              <RoomTitle>{room.title}</RoomTitle>
              <RoomMemberCount>
                {room.currentMember} / {room.maximumMember}
              </RoomMemberCount>
            </RoomInfo>
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
  inline-block w-full text-center cursor-pointer
`;

const RoomInfo = tw.div`
  flex flex-col w-full h-full shadow bg-white/10 rounded-2xl
`;

// const RoomGame = tw.div`
//   border-b border-neutral-700
// `;

const RoomTitle = tw.div`
  pt-4 h-full text-3xl
`;

const RoomMemberCount = tw.div`
 text-4xl
`;
