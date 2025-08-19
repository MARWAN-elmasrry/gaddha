import api from "../axios";

export const passUser = async (oldPassword, newPassword) => {
  try {
    const storedData = localStorage.getItem("authData");
    let token = null;
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      token = parsedData.token; 
    }
    if (!token) {
      throw new Error("لم يتم العثور على التوكن، يرجى تسجيل الدخول مرة أخرى");
    }
    const response = await api.post(
      "/user/change-password",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى تغير كلمة المرور";
  }
};

