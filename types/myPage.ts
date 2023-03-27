export interface PasswordEditValue {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

export interface NicknameEditValue {
  nickname: string;
}

export interface PasswordEditProps {
  handlePasswordEditSubmit: (data: PasswordEditValue) => Promise<void>;
}

export interface NicknameEditProps {
  handleNicknameEditSubmit: (data: NicknameEditValue) => Promise<void>;
}

export interface DeleteAccountProps {
  handleModalOpen: () => void;
}
