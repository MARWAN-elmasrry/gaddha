import api from "../axios.js";

export const loginAdmin = async (identifier, password) => {
  try {
    const response = await api.post("/admin/login", { identifier, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
