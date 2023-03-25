import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useLoginForm = () => {
  const loginSchema = yup.object().shape({
    email: yup.string().email().required("이메일을 입력해주세요"),
    password: yup
      .string()
      .trim()
      .min(8)
      .max(15)
      .matches(
        /^^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^+\-=])(?=\S+$).*$/,
        "대문자, 소문자, 특수문자, 숫자를 이용하여 8자이상 15자 이하 비밀번호를 입력해주세요."
      )
      .required("비밀번호를 입력해주세요"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const emailError = errors.email;
  const passwordError = errors.password;

  return {
    watchEmail,
    watchPassword,
    emailError,
    passwordError,
    register,
    handleSubmit,
  };
};

export default useLoginForm;
