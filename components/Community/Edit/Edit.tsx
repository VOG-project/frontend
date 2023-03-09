import React, { useState } from "react";
import dynamic from "next/dynamic";
import tw from "twin.macro";
import MainLayout from "@/components/layout/MainLayout";
import Input from "@/components/common/Input";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Edit = () => {
  const [text, setText] = useState("");
  console.log(text);
  return (
    <MainLayout>
      <EditContainer>
        <Editor>
          <EditTitle placeholder="제목을 입력하세요"></EditTitle>
          <EditCategory>
            <option>전체</option>
            <option>전체</option>
            <option>전체</option>
            <option>전체</option>
          </EditCategory>
          <ReactQuill theme="snow" value={text} onChange={setText} />
        </Editor>
      </EditContainer>
    </MainLayout>
  );
};

export default Edit;

const EditContainer = tw.section`
  w-full h-full ml-64
`;

const Editor = tw.div`
  h-4/5 p-4
  [& .quill]:(flex flex-col h-full w-full bg-white text-black)
  [& .ql-container]:(overflow-auto)
`;

const EditTitle = tw(Input)`
  h-40 border-b border-neutral-700
`;

const EditCategory = tw.select``;
