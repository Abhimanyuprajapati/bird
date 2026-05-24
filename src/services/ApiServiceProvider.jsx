import { jwtDecode } from "jwt-decode";
import API from "./API";
import FreeAPI from "./FreeApi";

const signup = async (data) => {
  try {
    const response = await FreeAPI.post("/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

const forgot = async (data) => {
  try {
    const response = await FreeAPI.post("/forgot_password_request", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

const login = async (data) => {
  try {
    const response = await FreeAPI.post("/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

const resetPassword = async (data) => {
  try {
    const response = await FreeAPI.post("/reset_password", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

const imageRecognition = async (data, token) => {
  const response = await API.post("/image_recognizor/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const verification = async (data, token) => {
  try {
    const response = await FreeAPI.post("/verify_otp", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const termsandcondition = async (data) => {
  const response = await FreeAPI.post("/terms_accepted", data);
  return response;
};

const resendOTP = async (data) => {
  try {
    const response = await FreeAPI.post("/resend_otp", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

const refreshAccessToken = async (data) => {
  try {
    const response = await FreeAPI.post("/refresh-token", {
      refreshtoken : data
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // console.log(currentTime);
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


const logout = () => {
  localStorage.clear();
};

export {
  imageRecognition,
  signup,
  logout,
  resendOTP,
  verification,
  login,
  decodeToken,
  forgot,
  resetPassword,
  refreshAccessToken,
  termsandcondition,
  isTokenExpired,
  getBase64,
};
