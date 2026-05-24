import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../services/GlobalContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/ApiServiceProvider";
import { Alert } from "../components/Alert";

export const FreeAccessRoute = ({ children }) => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken || refreshToken) {
      setShowModal(true); // Show custom modal
    }
  }, []);

  const handleSuccess = () => {
    setShowModal(false);
    dispatch({ type: "logout" });
    logout();
    navigate("/login"); // Or navigate to login
  };

  const handleFailer = () => {
    setShowModal(false); // Hide modal if user cancels
    navigate("/"); // Or back to home
  };

  return (
    <>
      {showModal && <Alert handleSuccess={handleSuccess} handleFailer={handleFailer} />}
      {!showModal && children}
    </>
  );
};










// import { useEffect, useContext } from "react";
// import { GlobalContext } from "../services/GlobalContext";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../services/ApiServiceProvider";

// export const FreeAccessRoute = ({ children }) => {
//   const { dispatch } = useContext(GlobalContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken || refreshToken) {
//       dispatch({ type: "logout" });
//       logout();
//       navigate("/"); 
//     }
//   }, [dispatch, navigate]);

//   return children;
// };







// here the user will show logout message 

// import { useEffect, useContext } from "react";
// import { GlobalContext } from "../services/GlobalContext";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../services/ApiServiceProvider";

// export const FreeAccessRoute = ({ children }) => {
//   const { dispatch } = useContext(GlobalContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken || refreshToken) {
//       const confirmLogout = window.confirm("You are about to log out. Continue?");
//       if (confirmLogout) {
//         dispatch({ type: "logout" });
//         logout();
//         navigate("/"); // Or stay on /login
//       } else {
//         // Cancel navigation by going back to previous route
//         navigate("/"); // or navigate("/") to home
//       }
//     }
//   }, [dispatch, navigate]);

//   return children;
// };




