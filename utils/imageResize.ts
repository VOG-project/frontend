import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 3,
  maxWidthOrHeight: 1280,
};

const imageResize = async (image: File) => {
  const IMAGE_TYPE = ["image/jpeg", "image/png"];
  if (!IMAGE_TYPE.includes(image.type)) {
    return;
  }

  try {
    const compressedFile = await imageCompression(image, options);

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};

export default imageResize;
