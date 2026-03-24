import API from "./axios";
// 🔹 Get Profile (protected route)
export const getUserProfile = async () => {
  return await API.get("/user/profile");
};

// 🔹 Get Profile update  (protected route)->isko baad me banayenge
export const updateUserProfile = async () => {
  return await API.put("/user/profile");
};