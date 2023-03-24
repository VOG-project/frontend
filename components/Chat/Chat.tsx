import { GetServerSideProps } from "next";
import tw from "twin.macro";
import useModal from "@/hooks/useModal";
import MainLayout from "../layout/MainLayout";
import RoomList from "./RoomList";
import ChatEdit from "./ChatEdit";
import Header from "../common/Header";
import Search from "../common/Search";
import Pagination from "../Pagination";
import Button from "../common/Button";
import { getChatRoomsRequest, getChatRoomCountRequest } from "@/apis/chat";
import { ChatProps } from "@/types/chat";

const Chat = ({ data }: ChatProps) => {
  const { result: roomList, chatRoomCount } = data;
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  return (
    <MainLayout>
      <ChatWrapper>
        <Header title="채팅" />
        <ChatContainer>
          <SearchContainer>
            <Button width={6} bgColor="primary" onClick={handleModalOpen}>
              방생성
            </Button>
            <Search />
          </SearchContainer>
          <RoomList roomList={roomList} />
        </ChatContainer>
        <ChatButtonContainer>
          <Pagination count={chatRoomCount} />
        </ChatButtonContainer>
      </ChatWrapper>
      <ChatEdit isOpen={isOpen} handleModalClose={handleModalClose} />
    </MainLayout>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getChatRoomsRequest(1);
  const chatRoomCountRes = await getChatRoomCountRequest();
  console.log(chatRoomCountRes);
  return {
    props: {
      data: { ...res, chatRoomCount: 20 },
    },
  };
};

const ChatWrapper = tw.article`
  w-full h-full p-4 ml-64
`;

const ChatContainer = tw.div`
  w-full px-10
`;

const SearchContainer = tw.div`
  flex items-center justify-between py-4
`;

const ChatButtonContainer = tw.div`
  relative p-4 clear-both
`;
