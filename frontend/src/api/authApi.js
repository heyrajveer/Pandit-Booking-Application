import API from "./axios";

// 🔹 Register
export const registerUser = async (data) => {
  return await API.post("/auth/register", data);
};
// 🔹 Login
export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const logoutUser = async () => {
  return await API.post("/auth/logout");
};

