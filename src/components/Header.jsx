import React from "react";
import { Logo } from "./Logo";
import { Logout } from "./Logout";

const webApplicationName =
  import.meta.env.VITE_WEB_APPLICATION_NAME || "Animal Species Recognizer Demo";

export const Header = ({ isLoggedIn }) => {
  return (
    <>
    <div className="container">
    <div className="row mb-4 border-bottom ">
        <div className="col-9 d-flex justify-content-start align-items-end flex-wrap gap-4 py-2">
          <Logo />
          <h3 className="fs-3">{webApplicationName}</h3>
        </div>
        {isLoggedIn && (
          <div className="col-3 d-flex justify-content-end align-items-end flex-wrap">
            <Logout />
          </div>
        )}
      </div>
    </div>
    </>
  );
};
