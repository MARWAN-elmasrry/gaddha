import api from "../axios";

export const passUser = async (oldPassword, newPassword) => {
  try {
    const authData = localStorage.getItem("authData");
    let token = null;

    if (authData) {
      try {
        const parsedAuthData = JSON.parse(authData);
        if (parsedAuthData.user) {
          const rawToken = localStorage.getItem("token");
          if (rawToken) {
            token =
              rawToken.startsWith('"') && rawToken.endsWith('"') ? rawToken.slice(1, -1) : rawToken;
          }
        }
      } catch (parseError) {
        console.error("Error parsing authData:", parseError);
      }
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

//reports
