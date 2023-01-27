import tw from "twin.macro";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  children: ReactNode;
}

const Button = ({ type = "button", children }: ButtonProps) => {
  return (
    <>
      <StyledButton type={type}>{children}</StyledButton>
    </>
  );
};

export default Button;

const StyledButton = tw.button`my-4 h-10 rounded bg-sky-900 text-white`;
