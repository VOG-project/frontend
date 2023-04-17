import { UserState } from "@/recoil/atoms/userState";

export interface ProfilePicEditValue {
  profilePic: FileList;
}

export interface PasswordEditValue {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

export interface NicknameEditValue {
  nickname: string;
}

export interface ProfilePicEditProps {
  handleProfilePicUpload: (data: ProfilePicEditValue) => Promise<void>;
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

export interface ProfileProps {
  user: UserState;
}
