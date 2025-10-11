import api from "../axios.js";

const getToken = () => {
  const rawToken = localStorage.getItem("token");
  if (rawToken) {
    return rawToken.startsWith('"') && rawToken.endsWith('"') ? rawToken.slice(1, -1) : rawToken;
  }
};
export const loginAdmin = async (identifier, password) => {
  try {
    const response = await api.post("/admin/login", { identifier, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
// Reports
export const getAllReports = async () => {
  try {
    const response = await api.get("/admin/get-all-reports", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch reports";
  }
};

export const reportReply = async (id, reply) => {
  try {
    const response = await api.post(
      `/admin/respond-to-report`,
      { reportId: id, responseText: reply },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reply report";
  }
};

export const reportAsSeen = async (id) => {
  try {
    const response = await api.post(
      `/admin/mark-report-as-seen`,
      { reportId: id },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to mark report as seen";
  }
};

//vouchers
export const getVouchers = async () => {
  try {
    const response = await api.get("/admin/get-all-vouchers", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("reach respons", response);
    return response.data.vouchers;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch vouchers";
  }
};
export const createVoucher = async (voucherData) => {
  try {
    const response = await api.post("/admin/create-voucher", voucherData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create voucher";
  }
};

export const editVoucher = async (voucherData) => {
  try {
    const response = await api.post("/admin/update-voucher", voucherData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to edit voucher";
  }
};

//categories

export const uploadCategoryWithQuestions = async (formData) => {
  try {
    const response = await api.post("/admin/upload-category-with-questions", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to upload category";
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get("/admin/categories", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.categories;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch categories";
  }
};
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/admin/get-category/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.category;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch category";
  }
};
export const toggleCategoryVisibility = async (categoryId) => {
  try {
    const response = await api.post(
      `/admin/toggle-category-visibility/${categoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to toggle category visibility";
  }
};
export const editCategory = async (formData) => {
  try {
    const response = await api.post("/admin/edit-category", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to edit category";
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.post(
      `/admin/delete-category-with-questions/${categoryId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to edit category";
  }
};
//questions
export const getQuestionById = async (id) => {
  try {
    const response = await api.get(`/admin/get-question/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.question;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch question";
  }
};

export const editQuestion = async (data) => {
  try {
    const response = await api.post(`/admin/edit-question`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update question";
  }
};

//control
export const getUserGameHistory = async (user) => {
  try {
    const response = await api.post(
      "/admin/get-user-game-history",
      {
        identifier: user,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to get history";
  }
};
export const addAdmin = async (addAdminData) => {
  try {
    const response = await api.post("/admin/add-admin", addAdminData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add admin";
  }
};

export const giftUserCoins = async (data) => {
  try {
    const response = await api.post("/admin/gift-user-coins", data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to gift user coins";
  }
};

export const getUserCoins = async (userId) => {
  try {
    const response = await api.get(`/admin/get-user-coins/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.coins;
  } catch (error) {
    throw error.response?.data?.message || "Failed to get user coins";
  }
};
//messages
export const getAllMessages = async () => {
  try {
    const response = await api.get(`/admin/get-all-messages`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.messages;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch message";
  }
};

export const messageReply = async (id, reply) => {
  try {
    const response = await api.post(
      `/admin/respond-to-message`,
      { messageId: id, responseText: reply },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reply message";
  }
};

export const messageAsSeen = async (id) => {
  try {
    const response = await api.post(
      `/admin/mark-message-as-seen`,
      { messageId: id },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reply message";
  }
};

//users
export const getAllUsers = async () => {
  try {
    const response = await api.get(`/admin/get-all-users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.users;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch message";
  }
};

export const getUserCount = async () => {
  try {
    const response = await api.get(`/admin/user-count`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.count.usersCount;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch message";
  }
};

// Sales
export const getLastSevenDays = async () => {
  try {
    const response = await api.get(`/admin/sales-last-seven-days`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch message";
  }
};

export const getTotalSoldGames = async () => {
  try {
    const response = await api.get(`/admin/total-sold-games`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.totalSoldGames;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch message";
  }
};

export const getTotalProfit = async () => {
  try {
    const response = await api.get(`/admin/total-profit`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.totalRevenue;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch message";
  }
};

export const getGamesSoldCounts = async () => {
  try {
    const [one, two, five, ten] = await Promise.all([
      api.get(`/admin/count-one-game-sold`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
      api.get(`/admin/count-two-game-sold`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
      api.get(`/admin/count-five-game-sold`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
      api.get(`/admin/count-ten-game-sold`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    ]);

    return {
      oneGame: one.data.oneGameSold,
      twoGames: two.data.twoGameSold,
      fiveGames: five.data.fiveGameSold,
      tenGames: ten.data.tenGameSold,
    };
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch counts";
  }
};
// upload to cloudinary

export const getSignatures = async (filesCount) => {
  try {
    const response = await api.post(
      `/admin/get-signature`,
      { filesCount },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data.signatures;
  } catch (error) {
    throw error.response?.data?.message || "Failed to reply message";
  }
};
