import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import useLoadingState from "@/hooks/useLoadingState";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Pagination from "@/components/Pagination/Pagination";
import Post from "./Post";
import { getPostRequest } from "@/apis/community";
import {
  getCommentsRequest,
  createCommentRequest,
  deleteCommentRequest,
} from "@/apis/comment";
import {
  getLikeListRequest,
  addLikePostRequest,
  cancelLikePostRequset,
} from "@/apis/like";
import { getTitle } from "@/utils/getTitle";
import { getIcons } from "@/components/icons";
import {
  CommunityQuery,
  ContentDetail,
  Comment,
  HandleRemoveCommentClick,
} from "@/types/community";

const Detail = () => {
  const [curPage, setCurPage] = useState(1);
  const [content, setContent] = useState<ContentDetail>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [likes, setLikes] = useState<Number[]>([]);
  const { userId } = useUserState();
  const { handleUserProfileOpen } = useUserProfileState();
  const { setLoadingFalse, setLoadingTrue } = useLoadingState();

  const { toast } = useToast();
  const router = useRouter();
  const query = router.query as CommunityQuery;

  const updateComments = async (postId: number, page: number) => {
    setLoadingTrue();
    const res = await getCommentsRequest(postId, page);

    if (res.success) {
      setComments(res.result);
    } else {
      toast.alert(res.error);
    }
    setLoadingFalse();
  };

  const updateLikes = async (postId: number) => {
    const res = await getLikeListRequest(postId);

    if (res.success) {
      setLikes(res.result.userIds);
    } else {
      toast.alert(res.error);
    }
  };

  const updatePostDetail = async (postId: number) => {
    const res = await getPostRequest(postId);

    if (res.success) {
      setContent(res.result);
    } else {
      toast.alert(res.error);
    }
  };

  useEffect(() => {
    if (!query.id) return;
    const postId = Number(query.id);
    setCategory(query.category);
    setTitle(getTitle(category));
    updatePostDetail(postId);
    updateComments(postId, 1);
    updateLikes(postId);
  }, [query, category]);

  useEffect(() => {
    if (!query.id) return;
    const postId = Number(query.id);
    updateComments(postId, curPage);
  }, [curPage]);

  const handleListButtonClick = () => {
    category ? router.push(`${category}`) : router.push("/community");
  };

  const handleCommentSubmit = async (content: string | undefined) => {
    if (!userId) return;
    if (!content) {
      toast.alert("댓글을 입력해주세요.");
      return;
    }

    const postId = Number(query.id);
    const res = await createCommentRequest(userId, postId, content);
    if (res.success) {
      updateComments(postId, 1);
    }
  };

  const handleRemoveCommentClick: HandleRemoveCommentClick = async (
    commentId
  ) => {
    const res = await deleteCommentRequest(commentId);
    if (res.success) {
      console.log(res);
    } else {
      toast.alert(res.error);
    }
  };

  const handleLikeButtonClick = async () => {
    if (!userId) return;
    const postId = Number(query.id);

    if (likes.includes(userId)) {
      const res = await cancelLikePostRequset(userId, postId);
      if (res.success) {
        updateLikes(postId);
      } else {
        toast.alert(res.error);
      }
    } else {
      const res = await addLikePostRequest(userId, postId);
      if (res.success) {
        updateLikes(postId);
      } else {
        toast.alert(res.error);
      }
    }
  };

  return (
    <MainLayout>
      <DetailWrapper>
        <Navigation category={category} />
        <DetailContainer>
          <Header title={title}>
            <Button
              width={5}
              bgColor="transparent"
              onClick={handleListButtonClick}
            >
              <ListButton>{getIcons("list", 24)}목록</ListButton>
            </Button>
          </Header>
          <Post
            userId={userId}
            content={content}
            comments={comments}
            likes={likes}
            handleCommentSubmit={handleCommentSubmit}
            handleRemoveCommentClick={handleRemoveCommentClick}
            handleLikeButtonClick={handleLikeButtonClick}
            handleUserProfileOpen={handleUserProfileOpen}
          />
        </DetailContainer>
        <Pagination count={40} curPage={curPage} setCurPage={setCurPage} />
      </DetailWrapper>
    </MainLayout>
  );
};

export default Detail;

const DetailWrapper = tw.article`
  w-full ml-64 p-4
`;

const DetailContainer = tw.section`
  w-full px-10 pb-24
`;

const ListButton = tw.div`
  flex items-center justify-center
`;
