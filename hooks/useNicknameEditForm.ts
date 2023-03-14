import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useNicknameEditForm = () => {
  const nicknameEditSchema = yup.object().shape({
    nickname: yup
      .string()
      .trim()
      .min(2)
      .max(10)
      .required("새 닉네임을 입력해주세요."),
  });

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
    resolver: yupResolver(nicknameEditSchema),
  });

  return { register, handleSubmit };
};

export default useNicknameEditForm;
