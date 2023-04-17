import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useModal from "@/hooks/useModal";
import useUserState from "@/hooks/useUserState";
import useChatState from "@/hooks/useChatState";
import useLoadingState from "@/hooks/useLoadingState";
import useToast from "@/hooks/useToast";
import MainLayout from "../layout/MainLayout";
import RoomList from "./RoomList";
import ChatEdit from "./ChatEdit";
import Header from "../common/Header";
import Search from "../common/Search";
import Pagination from "../Pagination";
import Button from "../common/Button";
import {
  createChatRoomRequest,
  joinChatRoomRequest,
  getChatRoomsRequest,
  getChatRoomCountRequest,
  searchChatRoomsRequest,
} from "@/apis/chat";
import { ChatProps, ChatEditValue, ChatQuery } from "@/types/chat";
import { getAccessToken } from "@/utils/tokenManager";
import { getIcons } from "../icons";
import { CHAT_SEARCH_OPTION } from "@/constants/search";

const Chat = ({ data }: ChatProps) => {
  const router = useRouter();
  const { result, chatRoomCount } = data;
  const [roomList, setRoomList] = useState(result);
  const [curPage, setCurPage] = useState(1);
  const [totalCount, setTotalCount] = useState(chatRoomCount);
  const { userId } = useUserState();
  const { chat, setChat } = useChatState();
  const { setLoadingTrue, setLoadingFalse } = useLoadingState();
  const { toast } = useToast();
  const { isOpen, handleModalClose, handleModalOpen } = useModal();
  const query = router.query as ChatQuery;

  useEffect(() => {
    if (chat.roomId) {
      router.push(`/chat/${chat.roomId}`);
    }
  }, []);

  useEffect(() => {
    const keyword = query.keyword;
    if (keyword) {
      (async () => {
        setLoadingTrue();
        setCurPage(1);
        const res = await searchChatRoomsRequest(keyword, curPage);
        if (res.success) {
          if (res.result.totalCount === 0) {
            toast.success("검색 결과가 없습니다.");
          } else {
            setRoomList(res.result.searchedResult);
            setTotalCount(res.result.totalCount);
          }
        } else {
          toast.alert(res.error);
        }
        setLoadingFalse();
      })();
    } else {
      (async () => await updateChatRooms(curPage))();
    }
  }, [query, curPage]);

  const updateChatRooms = async (curPage: number) => {
    setLoadingTrue();
    const res = await getChatRoomsRequest(curPage);
    setRoomList(res.result);
    await getChatRoomCountRequest().then((res) => {
      const chatRoomCount = res.result.chatRoomCount;
      setTotalCount(chatRoomCount);
    });
    setLoadingFalse();
  };

  const handleChatRoomCreate = async (data: ChatEditValue) => {
    if (!userId) {
      router.push("/login");
      return;
    }

    const { title, description, maximumMember } = data;
    const res = await createChatRoomRequest(
      userId,
      title,
      description,
      maximumMember
    );
    if (res.success) {
      const { roomId } = res.result;
      setChat((prev) => {
        return { ...prev, roomId: roomId };
      });
      router.push(`/chat/${roomId}`);
    } else {
      toast.alert(res.error);
    }
  };

  const handleRoomClick = async (roomId: string) => {
    if (!userId) {
      router.push("/login");
      return;
    }

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
    <MainLayout>
      <ChatWrapper>
        <Header title="채팅" />
        <ChatContainer>
          <SearchContainer>
            <ChatButtonContainer>
              <Button width={6} bgColor="primary" onClick={handleModalOpen}>
                방생성
              </Button>
              <RefreshButton onClick={() => updateChatRooms(curPage)}>
                <RefreshIcon>{getIcons("reload", 30)}</RefreshIcon>
              </RefreshButton>
            </ChatButtonContainer>
            <Search options={CHAT_SEARCH_OPTION} />
          </SearchContainer>
          <RoomList roomList={roomList} handleRoomClick={handleRoomClick} />
        </ChatContainer>
        <PaginationContainer>
          <Pagination
            curPage={curPage}
            count={totalCount}
            setCurPage={setCurPage}
          />
        </PaginationContainer>
      </ChatWrapper>
      <ChatEdit
        isOpen={isOpen}
        handleModalClose={handleModalClose}
        handleChatRoomCreate={handleChatRoomCreate}
      />
    </MainLayout>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const accessToken = getAccessToken(req);
  const res = await getChatRoomsRequest(1, accessToken);
  const chatRoomCountRes = await getChatRoomCountRequest(accessToken);

  if (res.success && chatRoomCountRes.success) {
    return {
      props: {
        data: { ...res, chatRoomCount: chatRoomCountRes.result.chatRoomCount },
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login?authorized=false",
        permanvet: false,
      },
      props: {},
    };
  }
};

const ChatWrapper = tw.article`
  w-full h-full p-4 ml-64
`;

const ChatContainer = tw.div`
  w-full px-10
`;

const ChatButtonContainer = tw.div`
  flex items-center gap-4
`;

const RefreshButton = tw.button`
  flex items-center justify-center w-10 h-10 rounded
  hover:bg-white/30
`;

const RefreshIcon = tw.div``;

const SearchContainer = tw.div`
  flex items-center justify-between py-4
`;

const PaginationContainer = tw.div`
  relative p-4 clear-both
`;
