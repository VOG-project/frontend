import React, { ChangeEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import useToast from "@/hooks/useToast";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import {
  createPostRequest,
  getPostRequest,
  editPostRequest,
} from "@/apis/community";
import { CommunityQuery } from "@/types/community";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CATEGORY = [
  { value: "free", text: "자유게시판" },
  { value: "humor", text: "유머게시판" },
  { value: "championship", text: "대회소식" },
];

const Edit = () => {
  const router = useRouter();
  const { toast } = useToast();
  const query = router.query as CommunityQuery;
  const { userId } = useUserState();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: query.category,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (query.editMode === "true") {
      setEditMode(true);
      const postId = Number(query.id);
      (async () => {
        const res = await getPostRequest(postId);

        if (res.success) {
          const title = res.result.title;
          const content = res.result.content;
          setPost((prev) => {
            return {
              ...prev,
              title: title,
              content: content,
            };
          });
        } else {
          router.back();
        }
      })();
    }
  }, []);

  const handlePostSumbit = async () => {
    if (!userId) return;
    if (!post.content) return toast.alert("내용을 입력해주세요.");
    if (!post.title) return toast.alert("제목을 입력해주세요.");

    const res = editMode
      ? await editPostRequest(Number(query.id), post.title, post.content)
      : await createPostRequest({
          writerId: userId,
          title: post.title,
          content: post.content,
          postCategory: post.category,
        });
    if (res.success) {
      const postId = res.result.id;
      const postCategory = res.result.postCategory;
      router.replace({
        pathname: `/community/${postId}`,
        query: {
          category: postCategory,
        },
      });
    } else {
      toast.alert(res.error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.trim();

    if (title.length > 50)
      return toast.alert("제목은 최대 50자까지 입력할 수 있습니다.");
    setPost((prev) => {
      return { ...prev, title: title };
    });
  };

  return (
    <MainLayout>
      <EditWrapper>
        <EditContainer>
          <EditCategory
            defaultValue={router.query.category}
            disabled={editMode ? true : false}
            onChange={(e) =>
              setPost((prev) => {
                return { ...prev, category: e.target.value };
              })
            }
          >
            {CATEGORY.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
            })}
          </EditCategory>
          <EditTitle
            width={32}
            placeholder="제목을 입력하세요"
            value={post.title}
            onChange={handleTitleChange}
          ></EditTitle>
          <Editor>
            <ReactQuill
              theme="snow"
              value={post.content}
              onChange={(value) => {
                setPost((prev) => {
                  return { ...prev, content: value };
                });
              }}
            />
          </Editor>
          <EditButtonContainer>
            <Button
              type="button"
              width={8}
              bgColor="primary"
              onClick={handlePostSumbit}
            >
              글쓰기
            </Button>
            <Button
              type="button"
              width={8}
              bgColor="secondary"
              onClick={() => {
                router.push({
                  pathname: "/community",
                  query: { category: query.category },
                });
              }}
            >
              취소
            </Button>
          </EditButtonContainer>
        </EditContainer>
      </EditWrapper>
    </MainLayout>
  );
};

export default Edit;

const EditWrapper = tw.section`
  w-full h-full ml-64
`;

const EditContainer = tw.div`
  relative flex flex-col w-full h-[900px] m-auto p-12
`;

const Editor = tw.div`
  grow-0 shrink-0 h-[600px]
  [& .quill]:(h-full w-full bg-black text-white fill-blue-100)
  [& .ql-container]:(overflow-auto)
  [& .ql-fill]:fill-white
  [& .ql-stroke]:stroke-white
  [& .ql-picker]:text-white
  [& .ql-picker-options]:text-black
`;

const EditTitle = tw.input`
  mb-4 p-2 border-b border-neutral-700 text-xl bg-transparent outline-none
  placeholder:text-neutral-700
`;

const EditCategory = tw.select`
  w-32 mb-4 bg-secondary rounded p-2 text-xl
  [& option]:bg-black
`;

const EditButtonContainer = tw.div`
  absolute flex items-center justify-around w-96 -bottom-8 right-16
`;
