import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useSignUpForm = () => {
  const signUpSchema = yup.object().shape({
    email: yup.string().email().required("이메일을 입력해주세요"),
    nickname: yup.string().trim().min(2).max(8),
    password: yup
      .string()
      .trim()
      .min(8)
      .max(15)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]$/,
        "대문자, 소문자, 특수문자, 숫자를 이용하여 8자이상 15자 이하 비밀번호를 입력해주세요."
      )
      .required("비밀번호를 입력해주세요"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
  });

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  return { register, handleSubmit };
};

export default useSignUpForm;
