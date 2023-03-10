import tw, { styled, css } from "twin.macro";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  width?: number;
  transparent?: boolean;
  position?: {
    type: "relative" | "absolute";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({
  type = "button",
  width,
  transparent,
  position,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <StyledButton
        type={type}
        width={width}
        transparent={transparent}
        position={position}
        onClick={onClick}
      >
        {children}
      </StyledButton>
    </>
  );
};

export default Button;

const StyledButton = styled.button<{
  width?: number;
  transparent?: boolean;
  position?: {
    type: "relative" | "absolute";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}>(({ width, transparent, position }) => [
  tw`my-4 h-10 rounded bg-primary text-white`,
  width &&
    css`
      width: ${width}rem;
    `,
  transparent &&
    css`
      background-color: transparent;
    `,
  position &&
    css`
      position: ${position.type};
      top: ${position.top};
      bottom: ${position.bottom};
      left: ${position.left};
      right: ${position.right};
    `,
]);
