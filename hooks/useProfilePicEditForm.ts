import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfilePicEditValue } from "@/types/myPage";

const useProfilePicEditForm = () => {
  const profilePicEditSchema = yup.object().shape({
    profilePic: yup.mixed().test("file", "사진을 등록해주세요.", (value) => {
      return value && value.length > 0 ? true : false;
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<ProfilePicEditValue>({
    mode: "onChange",
    resolver: yupResolver(profilePicEditSchema),
  });

  const watchProfilePic = watch("profilePic");

  return {
    isDirty,
    isValid,
    watchProfilePic,
    reset,
    setValue,
    register,
    handleSubmit,
  };
};

export default useProfilePicEditForm;
