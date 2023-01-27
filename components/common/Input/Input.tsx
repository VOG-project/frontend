import tw from "twin.macro";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn<"email" | "password">;
  type?: "default" | "password";
  placeholder?: string;
}

const Input = ({ register, placeholder, type = "default" }: InputProps) => {
  return (
    <>
      <StyledInput {...register} placeholder={placeholder} type={type} />
    </>
  );
};

export default Input;

const StyledInput = tw.input`
px-2 w-full h-10 bg-transparent outline-0
placeholder:text-gray-600
`;
