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
import { getChatRoomsRequest } from "@/apis/chat";
import { ChatProps } from "@/types/chat";

const Chat = ({ data }: ChatProps) => {
  const { isOpen, handleModalClose, handleModalOpen } = useModal();
  const roomList = data.result;

  return (
    <MainLayout>
      <ChatWrapper>
        <Header title="채팅" />
        <ChatContainer>
          <SearchContainer>
            <Search />
          </SearchContainer>
          <RoomList roomList={roomList} />
        </ChatContainer>
        <ChatButtonContainer>
          <Pagination />
          <Button
            width={6}
            bgColor="primary"
            position={{ type: "absolute", top: "0", right: "8rem" }}
            onClick={handleModalOpen}
          >
            방생성
          </Button>
        </ChatButtonContainer>
      </ChatWrapper>
      <ChatEdit isOpen={isOpen} handleModalClose={handleModalClose} />
    </MainLayout>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getChatRoomsRequest({ page: 1 });

  return { props: { data: res } };
};

const ChatWrapper = tw.article`
  w-full h-full p-4 ml-64
`;

const ChatContainer = tw.div`
  w-full px-10
`;

const SearchContainer = tw.div`
  flex justify-end py-4
`;

const ChatButtonContainer = tw.div`
  relative p-4
`;
