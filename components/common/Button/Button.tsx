import tw, { styled, css } from "twin.macro";
import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  width?: number;
  height?: number;
  margin?: number;
  bgColor: "primary" | "secondary" | "transparent";
  position?: {
    type: "relative" | "absolute";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void | Promise<void>;
}

const Button = ({
  type = "button",
  width,
  height,
  margin,
  bgColor = "primary",
  position,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <StyledButton
        type={type}
        width={width}
        height={height}
        margin={margin}
        bgColor={bgColor}
        position={position}
        disabled={disabled}
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
  height?: number;
  margin?: number;
  bgColor: "primary" | "secondary" | "transparent";
  position?: {
    type: "relative" | "absolute";
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}>(({ width, height, margin, bgColor, position }) => [
  tw`my-4 h-10 w-full rounded
    disabled:(bg-stone-500 text-stone-400)
  `,
  width &&
    css`
      width: ${width}rem;
    `,
  height &&
    css`
      height: ${height}rem;
    `,
  margin &&
    typeof margin === "number" &&
    css`
      margin-top: ${margin}rem;
      margin-bottom: ${margin}rem;
    `,
  bgColor &&
    (bgColor === "primary"
      ? tw`bg-primary enabled:hover:bg-[#c3a888]`
      : bgColor === "secondary"
      ? tw`bg-secondary enabled:hover:bg-[#ff1d53]`
      : tw`bg-transparent enabled:hover:bg-neutral-600`),
  position &&
    css`
      position: ${position.type};
      top: ${position.top};
      bottom: ${position.bottom};
      left: ${position.left};
      right: ${position.right};
    `,
]);
