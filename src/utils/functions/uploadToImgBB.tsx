export const uploadToImgBB = async (
  imageFile: File
): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey || !imageFile) return null;

  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append("image", imageFile);

  try {
    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      return data.data.url;
    } else {
      console.error("ImgBB Upload Error:", data.error.message);
      return null;
    }
  } catch (error) {
    console.error("Network Error uploading to ImgBB:", error);
    return null;
  }
};
