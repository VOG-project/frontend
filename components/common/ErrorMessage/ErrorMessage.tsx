import { ReactNode } from "react";
import tw from "twin.macro";

interface ErrorMessageProps {
  children: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <>
      <StyledErrorMessage>{children}</StyledErrorMessage>
    </>
  );
};

export default ErrorMessage;

const StyledErrorMessage = tw.p`
  px-4 text-red-700 mb-2
`;
