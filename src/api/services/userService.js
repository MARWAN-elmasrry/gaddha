import { data } from "react-router-dom";
import api from "../axios";
let token = null;

const getToken = () => {
  const rawToken = localStorage.getItem("token");
  if (rawToken) {
    return rawToken.startsWith('"') && rawToken.endsWith('"') ? rawToken.slice(1, -1) : rawToken;
  }
};
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
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى تغير كلمة المرور";
  }
};

export const createPayment = async (data) => {
  const rawToken = localStorage.getItem("token");
  let token;
  if (rawToken) {
    token = rawToken.startsWith('"') && rawToken.endsWith('"') ? rawToken.slice(1, -1) : rawToken;
  } else return;
  try {
    const response = await api.post("/user/create-payment", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى انشاء الدفع";
  }
};

//otp
export const verifyOtp = async (data) => {
  try {
    console.log("data in service", data);
    const response = await api.post("/user/verify-otp", data);
    return response.data?.user || response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى التحقق من OTP";
  }
};

export const resendOtp = async (data) => {
  try {
    console.log("data in service", data);
    const response = await api.post("/user/resend-otp", data);
    return response.data?.user || response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى التحقق من OTP";
  }
};

//categories
export const getCategories = async () => {
  try {
    const response = await api.get("user/categories", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.groupedCategories;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب الفئات";
  }
};
export const toggleCategoryFavorite = async (categoryId) => {
  try {
    const response = await api.post(
      "/user/toggle-category-favourite",
      { categoryId },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى اضافة الفئة للمفضلة";
  }
};
export const getFavoriteCategories = async () => {
  try {
    const response = await api.get("/user/favourite-categories", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.favouriteCategories;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب الفئات المفضلة";
  }
};
//reports
export const createReport = async (data) => {
  try {
    const response = await api.post("/user/create-report", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى انشاء التقرير";
  }
};

// game
export const startGameCheck = async () => {
  try {
    const response = await api.post(
      "/user/start-game",
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى بدء اللعبة";
  }
};

export const createGameSession = async (data) => {
  try {
    const response = await api.post("/user/create-gameSession", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى انشاء جلسة اللعبة";
  }
};

export const gameHistory = async () => {
  try {
    const response = await api.get("/user/game-history", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.gameHistory;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب تاريخ الالعاب";
  }
};
export const getGameSession = async (id) => {
  try {
    const response = await api.get(`/user/gameSession/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.session;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب جلسة اللعبة";
  }
};

//messages

export const sendMessage = async (data) => {
  try {
    const response = await api.post("/user/send-message", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى ارسال الرسالة";
  }
};
export const myMessagesResponses = async () => {
  try {
    const response = await api.get("/user/my-messages-responses", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.messages;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب ردود الرسائل";
  }
};
//groups
export const getGroups = async () => {
  try {
    const response = await api.get("/user/groups");
    return response.data.groups;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب المجموعات";
  }
};
// last three cate
export const LatestThreeCate = async () => {
  try {
    const response = await api.get("/user/latest-three-categories");
    console.log(response);
    return response.data.categories;
  } catch (error) {
    throw error.response?.data?.message || error.message || "خطأ فى جلب المجموعات";
  }
};
