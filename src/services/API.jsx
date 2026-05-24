import axios from "axios";

const VITE_BACKEND_ENDPOINT_URL = import.meta.env.VITE_BACKEND_ENDPOINT_URL;

const API = axios.create({
  baseURL: VITE_BACKEND_ENDPOINT_URL,
});

// Attach token to headers if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Avoid retry loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        // Use a basic axios instance to prevent interceptor loops
        const refreshResponse = await axios.post(`${VITE_BACKEND_ENDPOINT_URL}/refresh-token`, {
          refreshtoken: refreshToken,
        });

        if (refreshResponse.status === 200) {
          // console.log("Token refreshed:", refreshResponse);

          const newAccessToken = refreshResponse.data.data.access_token;
          const newRefreshToken = refreshResponse.data.data.refresh_token;

          localStorage.setItem("token", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return API(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;






















// import axios from "axios";

// const VITE_BACKEND_ENDPOINT_URL = import.meta.env.VITE_BACKEND_ENDPOINT_URL;

// const API = axios.create({
//   baseURL: VITE_BACKEND_ENDPOINT_URL,
// });

// // Attach token to headers if available
// API.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor to handle token refresh
// API.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("No refresh token");

//         // Call refresh token endpoint
//         const response = await axios.post(`${VITE_BACKEND_ENDPOINT_URL}/refresh-token`, {
//           refreshtoken: refreshToken,
//         });

//         if(response.status===200){
//           console.log("this is for refresh API token", response)

//           const newAccessToken = response.data.data.access_token;
//           const newRefreshToken = response.data.data.refresh_token;
  
//           // Save new tokens
//           localStorage.setItem("token", newAccessToken);
//           localStorage.setItem("refreshToken", newRefreshToken);
  
//           // Update Authorization header and retry original request
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return API(originalRequest);
//         }else{
//           localStorage.removeItem("token");
//           localStorage.removeItem("refreshToken");
//           window.location.href = "/login";
//         }
      
//       } catch (refreshError) {
//         // Refresh failed, logout or redirect
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;










