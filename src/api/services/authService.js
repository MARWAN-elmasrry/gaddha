import api from "../axios.js";

export const loginUser = async (identifier, password) => {
  try {
    const response = await api.post("/user/login", { identifier, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const RegisterUser = async ({
      name,
      email,
      password,
      countryCode,
      phone,
      birthday,
    }) => {
    try {
      const response = await api.post("/user/register", {
        username: name, 
        email,
        password,
        countryCode,
        phone,
        birthday,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "register failed";
    }
};
