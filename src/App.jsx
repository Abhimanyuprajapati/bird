import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./components/Home";
import { DetailsPage } from "./components/DetailsPage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProtectedRoute } from "./routeAuthentication/ProtectedRoute ";
import { Forgot } from "./components/Forgot";
import { ResetPassword } from "./components/ResetPassword";
import { Toaster } from "react-hot-toast";
import {
  isTokenExpired,
  logout,
  refreshAccessToken,
} from "./services/ApiServiceProvider";
import { FreeAccessRoute } from "./routeAuthentication/FreeAccessRoute";
import { GlobalContext } from "./services/GlobalContext";

function App() {
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        navigate("/login");
        return;
      }

      // console.log("i am from istoken => ", isTokenExpired(accessToken));

      if (isTokenExpired(accessToken)) {
        try {
          const response = await refreshAccessToken(refreshToken);

          if (response.status === 200) {
            const newAccessToken = response.data.data.access_token;
            const newRefreshToken = response.data.data.refresh_token;

            localStorage.setItem("token", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            // console.log("Access token refreshed.");
          } else {
            dispatch({ type: "logout" });
            logout();
            navigate("/login");
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          dispatch({ type: "logout" });
          logout();
          navigate("/login");
        }
      } else {
        // Token is valid, proceed as normal
        // console.log("Token is valid, continue rendering");
      }
    };

    checkAuth();
  }, []);

  // }, [navigate]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <FreeAccessRoute>
              <Login />
            </FreeAccessRoute>
          }
        />
        <Route
          path="/register"
          element={
            <FreeAccessRoute>
              <Register />
            </FreeAccessRoute>
          }
        />
        <Route
          path="/forgot"
          element={
            <FreeAccessRoute>
              <Forgot />
            </FreeAccessRoute>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <FreeAccessRoute>
              <ResetPassword />
            </FreeAccessRoute>
          }
        />
        <Route
          path="/detailspage"
          element={
            <ProtectedRoute>
              <DetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;













// import { Routes, Route } from "react-router-dom";
// import { Home } from "./components/Home";
// import { useHistory } from 'react-router-dom';
// import { DetailsPage } from "./components/DetailsPage";
// import { Login } from "./components/Login";
// import { Register } from "./components/Register";
// import { Verification } from "./components/Verification";
// import { ProtectedRoute } from "./routeAuthentication/ProtectedRoute ";
// import { Forgot } from "./components/Forgot";
// import { ResetPassword } from "./components/ResetPassword";
// import { Toaster } from 'react-hot-toast';
// import { Sample } from "./components/Sample";
// import { isTokenExpired, refreshAccessToken } from "./services/ApiServiceProvider";

// function App() {
//   const history = useHistory();

//   useEffect(() => {
//     const accessToken = localStorage.getItem('token');
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (!accessToken || !refreshToken) {
//       history.push('/login');
//       return;
//     }

//     if (!isTokenExpired(accessToken)) {
//       // Access token is expired, attempt to refresh
//      const response =  refreshAccessToken(refreshToken)
//         if (response.status === 200) {

//            // Token refreshed, proceed to render
//            const newAccessToken = response.data.data.access_token;
//            const newRefreshToken = response.data.data.refresh_token;

//            localStorage.setItem("token", newAccessToken);
//            localStorage.setItem("refreshToken", newRefreshToken);
//         } else {
//           // Refresh failed, redirect to login
//           history.push('/login');
//         }
//     } else {
//       // Access token is valid, proceed to render
//       WHAT TO DO HERE
//     }
//   }, [history]);

//   return (
// <>
//  <Toaster />
//   <Routes>
//     <Route
//       path="/"
//       element={
//         <ProtectedRoute>
//           <Home />
//         </ProtectedRoute>
//       }
//     />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/verification" element={<Verification />} />
//     <Route path="/forgot" element={<Forgot />} />
//     <Route path="/resetpassword" element={<ResetPassword />} />
//     <Route path="/sample" element={<Sample />} />
//     <Route
//       path="/detailspage"
//       element={
//         <ProtectedRoute>
//           <DetailsPage />
//         </ProtectedRoute>
//       }
//     />
//   </Routes>
// </>
//   );
// }

// export default App;

// `````
