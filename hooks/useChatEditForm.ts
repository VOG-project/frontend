import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChatEditValue } from "@/types/chat";

const useChatEditForm = () => {
  const chatSchema = yup.object().shape({
    title: yup
      .string()
      .required("제목을 입력해주세요.")
      .max(50, "제목은 최대 50자까지 입력할 수 있습니다."),
    description: yup.string().required("상세설명을 입력해주세요."),
    maximumMember: yup
      .number()
      .min(2)
      .max(5)
      .required("최대인원을 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChatEditValue>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      maximumMember: 2,
    },
    resolver: yupResolver(chatSchema),
  });

  const titleError = errors.title;
  const descriptionError = errors.description;
  const memberLengthError = errors.maximumMember;

  return {
    titleError,
    descriptionError,
    memberLengthError,
    errors,
    register,
    handleSubmit,
  };
};

export default useChatEditForm;
