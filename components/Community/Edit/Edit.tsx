import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import tw from "twin.macro";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { getIcons } from "@/components/icons";
import { createPostRequest } from "@/apis/community";
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
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { category } = router.query as CommunityQuery;

  const handleImageInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSumbit = async () => {
    const res = await createPostRequest(category, {
      writerId: 3,
      title: "테스트",
      content: text,
      gameCategory: "LOL",
    });
    console.log(res);
  };

  return (
    <MainLayout>
      <EditWrapper>
        <EditContainer>
          <EditCategory defaultValue={router.query.category}>
            {CATEGORY.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
            })}
          </EditCategory>
          <EditTitle width={32} placeholder="제목을 입력하세요"></EditTitle>
          <Editor>
            <ReactQuill theme="snow" value={text} onChange={setText} />
          </Editor>
          <EditInputButton onClick={handleImageInputClick}>
            {getIcons("plus", 128, "gray")}
          </EditInputButton>
          <EditImageInput type={"file"} ref={inputRef}></EditImageInput>
          <EditButtonContainer>
            <Button
              type="button"
              width={8}
              bgColor="primary"
              onClick={handleSumbit}
            >
              글쓰기
            </Button>
            <Button type="button" width={8} bgColor="secondary">
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

const EditImageInput = tw.input`
  hidden
`;

const EditInputButton = tw.div`
  absolute flex items-center justify-center w-[140px] h-[140px] -bottom-16 rounded bg-zinc-800 cursor-pointer
`;

const EditButtonContainer = tw.div`
  absolute flex items-center justify-around w-96 -bottom-8 right-16
`;
