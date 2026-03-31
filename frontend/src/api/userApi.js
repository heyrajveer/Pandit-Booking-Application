import API from "./axios";
// 🔹 Get Profile (protected route)
export const getUserProfile = async () => {
  return await API.get("/user/profile");
};

export const uploadUserProfileImage = async (formData) => {
  return await API.post("/user/upload-profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🔹 Update profile (protected route)
export const updateUserProfile = async (data) => {
  return await API.put("/user/profile", data);
};