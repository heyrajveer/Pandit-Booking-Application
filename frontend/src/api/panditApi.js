import API from "./axios";

// 🔹 get all pandits
export const getAllPandits = () => API.get("/pandit");

// 🔹 get single pandit
export const getPanditProfileById = (id) => API.get(`/pandit/${id}`);

// 🔹 get my pandit profile
export const getMyPanditProfile = () => API.get("/pandit/profile");

//pandit profile create
export const createPanditProfile = (data) => API.post("/pandit/create");

// 🔹 update pandit profile
export const updatePanditProfile = (data) => API.put("/pandit/update", data);

export const getPanditByCity = (city) => {
  return API.get(`/pandit/city/search?city=${city}`);
};