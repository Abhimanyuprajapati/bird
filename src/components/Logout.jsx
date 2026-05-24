import React, { useContext, useState } from "react";
import { logout } from "../services/ApiServiceProvider";
import { GlobalContext } from "../services/GlobalContext";
import logoutimg from '../assets/logout.png'
import { Alert } from "./Alert";

export const Logout = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);

  const logoutHandle = ()=>{
    // dispatch({ type: "logout" });
    // logout();
    setShowModal(true)
  }

  const handleSuccess = () => {
    setShowModal(false);
    dispatch({ type: "logout" });
    logout(); // Or navigate to login
  };

  const handleFailer = () => {
    setShowModal(false); 
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-4">
        <strong className="rounded-circle p-2">
        Welcome {state.userName} 
        </strong>
            <img src={logoutimg} alt="logout" width={30} height={30}  onClick={logoutHandle} className="img-fluid rounded-circle" style={{cursor:"pointer"}} />
      </div>

      {showModal && <Alert handleSuccess={handleSuccess} handleFailer={handleFailer} />}
    </>
  );
};
