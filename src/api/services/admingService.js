import api from "../axios.js";
const rawToken = localStorage.getItem("token");
let token = null;

if (rawToken) {
  token = rawToken.startsWith('"') && rawToken.endsWith('"') ? rawToken.slice(1, -1) : rawToken;
}
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
    const response = await api.get("/admin/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch reports";
  }
};

//vouchers
export const getVouchers = async () => {
  try {
    const response = await api.get("/admin/get-all-vouchers", {
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to upload category";
  }
};
