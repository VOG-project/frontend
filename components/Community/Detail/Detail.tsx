import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Post from "./Post";
import Circle from "@/components/common/Loading/Circle";
import { getPostRequest } from "@/apis/community";
import { getCommentsRequest, createCommentRequest } from "@/apis/comment";
import {
  getLikeListRequest,
  addLikePostRequest,
  cancelLikePostRequset,
} from "@/apis/like";
import { getTitle } from "@/utils/getTitle";
import { getIcons } from "@/components/icons";
import { CommunityQuery, ContentDetail, Comment } from "@/types/community";

const Detail = () => {
  const [content, setContent] = useState<ContentDetail>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [likes, setLikes] = useState<Number[]>([]);
  const { userId } = useUserState();
  const { handleUserProfileOpen } = useUserProfileState();
  const { targetRef, cursor, isLoading, setIsLoading } = useInfiniteScroll();
  const { toast } = useToast();
  const router = useRouter();
  const query = router.query as CommunityQuery;

  const updateComments = async (postId: number, cursor?: number) => {
    setIsLoading(true);
    const res = await getCommentsRequest(postId, cursor);

    if (res.success) {
      setComments((prev) => {
        if (!cursor) {
          return res.result;
        }
        return [...prev, ...res.result];
      });
    } else {
      toast.alert(res.error);
    }
    setIsLoading(false);
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
    updateComments(postId);
    updateLikes(postId);
  }, [query, category]);

  useEffect(() => {
    if (cursor === 1) return;
    if (!query.id) return;
    const postId = Number(query.id);
    updateComments(postId, cursor);
  }, [cursor]);

  const handleListButtonClick = () => {
    category ? router.push(`${category}`) : router.push("/community");
  };

  const handleCommentSubmit = async (
    content: string | undefined,
    group: number | undefined,
    sequence: number
  ) => {
    if (!userId) return;
    if (!content) {
      toast.alert("댓글을 입력해주세요.");
      return;
    }

    const postId = Number(query.id);
    const res = await createCommentRequest(
      userId,
      postId,
      content,
      group || userId,
      sequence
    );
    if (res.success) {
      updateComments(postId);
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
            content={content}
            comments={comments}
            likes={likes}
            handleCommentSubmit={handleCommentSubmit}
            handleLikeButtonClick={handleLikeButtonClick}
            handleUserProfileOpen={handleUserProfileOpen}
          />
        </DetailContainer>
        <Observer ref={isLoading ? undefined : targetRef}>
          {isLoading ? <Circle /> : "댓글 더보기"}
        </Observer>
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

const Observer = tw.div`
  flex items-center justify-center w-full h-32 text-center
`;
