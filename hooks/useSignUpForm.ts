import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpValue } from "@/types/auth";

const useSignUpForm = () => {
  const signUpSchema = yup.object().shape({
    email: yup.string().email().max(20).required("이메일을 입력해주세요"),
    nickname: yup.string().trim().min(2).max(10),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
    gender: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpValue>({
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const watchEmail = watch("email");
  const watchNickname = watch("nickname");
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");
  const watchGender = watch("gender");
  const emailError = errors.email;
  const nicknameError = errors.nickname;
  const passwordError = errors.password;
  const confirmPasswordError = errors.confirmPassword;
  const genderError = errors.gender;

  return {
    watchEmail,
    watchNickname,
    watchPassword,
    watchConfirmPassword,
    watchGender,
    emailError,
    nicknameError,
    passwordError,
    confirmPasswordError,
    genderError,
    register,
    handleSubmit,
  };
};

export default useSignUpForm;
