import React from "react";

export const Alert = ({handleSuccess, handleFailer}) => {
  return (
    <>
      <div className="otp-modal-overlay">
        <div className="position-absolute top-50 start-50 translate-middle termsandcondition p-4 rounded-4 container w-auto h-auto d-flex flex-column justify-content-between">
       
            <div>
                <h1 className="fs-3 text-danger">
                Alert
                </h1>
            </div>
            <div><p className="fs-4 p-2"> Are you sure do you want to logout</p></div>
            <div className="d-flex flex-row justify-content-end gap-3">
                <button onClick={handleSuccess}  className="btn btn-success">Yes</button>
                <button onClick={handleFailer} className="btn btn-danger">No</button>
            </div>
          </div>
      </div>
    </>
  );
};
