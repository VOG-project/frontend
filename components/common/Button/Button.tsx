import tw, { styled, css } from "twin.macro";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  width?: number;
  transparent?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  width,
  transparent,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <StyledButton
        type={type}
        width={width}
        transparent={transparent}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    </>
  );
};

export default Button;

const StyledButton = styled.button<{ width?: number; transparent?: boolean }>(
  ({ width, transparent }) => [
    tw`my-4 h-10 rounded bg-sky-500 text-white`,
    width &&
      css`
        width: ${width}rem;
      `,
    transparent &&
      css`
        background-color: transparent;
      `,
  ]
);
