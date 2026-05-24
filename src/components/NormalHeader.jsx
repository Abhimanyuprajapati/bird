import React from 'react'
import { Logo } from "./Logo";

const webApplicationName =
  import.meta.env.VITE_WEB_APPLICATION_NAME || "Animal Species Recognizer Demo";

export const NormalHeader = () => {
  return (
    <div className="container">
    <div className="row mb-4 border-bottom ">
        <div className="col-9 d-flex justify-content-start align-items-end flex-wrap gap-4 py-2">
          <Logo />
          <h3 className="fs-3">{webApplicationName}</h3>
        </div>
      </div>
    </div>
  )
}







// import React from "react";

// import { Logout } from "./Logout";



// export const Header = ({ isLoggedIn }) => {
//   return (
//     <>
   
//     </>
//   );
// };
