import * as yup from "yup";

const validatePassword = async (password: string) => {
  const passwordSchema = yup
    .string()
    .trim()
    .min(8)
    .max(15)
    .matches(
      /^^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^+\-=])(?=\S+$).*$/,
      "대문자, 소문자, 특수문자, 숫자를 이용하여 8자이상 15자 이하 비밀번호를 입력해주세요."
    )
    .required("비밀번호를 입력해주세요");

  return await passwordSchema.validate(password);
};

export default validatePassword;
