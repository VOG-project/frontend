import { ChangeEventHandler } from "react";
import tw, { styled, css } from "twin.macro";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register?: UseFormRegisterReturn<
    | "email"
    | "password"
    | "confirmPassword"
    | "nickname"
    | "sex"
    | "currentPassword"
    | "title"
    | "maximumMember"
  >;
  placeholder?: string;
  value?: string;
  width?: number;
  height?: number;
  bgColor?: "gray";
  type?: "default" | "password" | "radio" | "number";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  register,
  placeholder,
  value,
  width,
  height,
  bgColor,
  type = "default",
  onChange,
}: InputProps) => {
  return (
    <>
      {onChange ? (
        <StyledInput
          placeholder={placeholder}
          value={value}
          width={width}
          height={height}
          bgColor={bgColor}
          type={type}
          onChange={onChange}
        />
      ) : (
        <StyledInput
          {...register}
          placeholder={placeholder}
          value={value}
          width={width}
          height={height}
          bgColor={bgColor}
          type={type}
        />
      )}
    </>
  );
};

export default Input;

const StyledInput = styled.input<{
  width?: number;
  height?: number;
  bgColor?: string;
}>(({ width, height, bgColor }) => [
  tw`px-2 w-full h-10 bg-transparent outline-0
  placeholder:(text-stone-600)`,
  width &&
    css`
      width: ${width}rem;
    `,
  height &&
    css`
      height: ${height}rem;
    `,
  bgColor &&
    bgColor === "gray" &&
    tw`bg-stone-700 rounded hover:bg-stone-600 placeholder:text-stone-300`,
]);
