import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Post from "./Post";
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
  const { toast } = useToast();
  const router = useRouter();
  const query = router.query as CommunityQuery;

  useEffect(() => {
    setCategory(query.category);
    setTitle(getTitle(category));
    (async () => {
      const postRes = await getPostRequest(Number(query.id));
      const commentsRes = await getCommentsRequest(Number(query.id));
      const likesRes = await getLikeListRequest(Number(query.id));

      if (postRes.success) {
        setContent(postRes.result);
      }

      if (commentsRes.success) {
        setComments(commentsRes.result);
      }

      if (likesRes.success) {
        setLikes(likesRes.result.userIds);
      }
    })();
  }, [query, category]);

  const handleListButtonClick = () => {
    category ? router.push(`${category}`) : router.push("/community");
  };

  const handleCommentSubmit = async (
    content: string | undefined,
    group: number,
    sequence: number
  ) => {
    if (!userId) return;

    if (!content) {
      toast.alert("댓글을 입력해주세요.");
      return;
    }

    const postId = query.id;
    const res = await createCommentRequest(
      userId,
      Number(postId),
      content,
      group,
      sequence
    );
    console.log(res);
  };

  const handleLikeButtonClick = async () => {
    if (!userId) return;
    const postId = query.id;

    if (userId in likes) {
      const res = await cancelLikePostRequset(Number(postId));
      console.log(res);
    } else {
      const res = await addLikePostRequest(Number(postId));
      console.log(res);
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
      </DetailWrapper>
    </MainLayout>
  );
};

export default Detail;

const DetailWrapper = tw.article`
  w-full ml-64 p-4
`;

const DetailContainer = tw.section`
  w-full px-10
`;

const ListButton = tw.div`
  flex items-center justify-center
`;
