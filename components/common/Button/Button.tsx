import tw, { styled, css } from "twin.macro";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  width?: number;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ type = "button", width, children, onClick }: ButtonProps) => {
  return (
    <>
      <StyledButton type={type} width={width} onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
};

export default Button;

const StyledButton = styled.button<{ width?: number }>(({ width }) => [
  tw`my-4 h-10 rounded bg-sky-500 text-white`,
  width &&
    css`
      width: ${width}px;
    `,
]);
