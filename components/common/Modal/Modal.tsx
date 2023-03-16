import { ReactNode } from "react";
import tw, { styled } from "twin.macro";
import Button from "../Button";
import { getIcons } from "@/components/icons";

interface ModalProps {
  isOpen: boolean;
  title: string;
  content?: string;
  children?: ReactNode;
  handleClose: () => void;
  handleConfirm: () => void;
}

const Modal = ({
  isOpen,
  title,
  content,
  children,
  handleClose,
  handleConfirm,
}: ModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton onClick={handleClose}>
            {getIcons("close", 24)}
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalText>{content}</ModalText>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            bgColor="secondary"
            width={4}
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            type="button"
            bgColor="primary"
            width={4}
            onClick={handleConfirm}
          >
            확인
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`hidden fixed flex items-center justify-center inset-0 bg-black/60 z-50 `,
  isOpen && tw`block`,
]);

const ModalContainer = tw.div`
  relative shadow bg-zinc-800 rounded-lg
`;

const ModalTitle = tw.h3`
  text-xl font-semibold
`;

const ModalText = tw.p``;

const ModalHeader = tw.div`
  flex items-start justify-between p-4 border-b border-neutral-700
`;

const ModalCloseButton = tw.button`
  flex items-center justify-center w-8 h-8 rounded
  hover:bg-neutral-600
`;

const ModalBody = tw.div`p-6`;

const ModalFooter = tw.div`
  flex justify-end space-x-4 border-t border-neutral-700
`;
