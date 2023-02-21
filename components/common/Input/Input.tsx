import tw, { styled, css } from "twin.macro";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn<
    "email" | "password" | "confirmPassword" | "nickname" | "sex"
  >;
  placeholder?: string;
  value?: string;
  width?: number;
  type?: "default" | "password" | "radio";
}

const Input = ({
  register,
  placeholder,
  value,
  width,
  type = "default",
}: InputProps) => {
  return (
    <>
      <StyledInput
        {...register}
        placeholder={placeholder}
        value={value}
        width={width}
        type={type}
      />
    </>
  );
};

export default Input;

const StyledInput = styled.input<{ width?: number }>(({ width }) => [
  tw`px-2 w-full h-10 bg-transparent outline-0
  placeholder:text-gray-600`,
  width &&
    css`
      width: ${width}rem;
    `,
]);
