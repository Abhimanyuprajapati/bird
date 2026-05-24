import React from "react";
import { Otp } from "./Otp";

export const OtpModule = ({
  email,
  otp,
  setOtp,
  handleResendOTP,
  handleOtpSubmit,
  setOtpModalOpen,
}) => {
  return (
    <>
      <div className="otp-modal-overlay">
        <div className="position-absolute top-50 start-50 translate-middle w-auto">
          <div className="bg-white shadow-lg w-full max-w-md rounded-3 p-3">
            <h3 className="mb-8 text-center">
              Enter OTP sent to{" "}
              <span className="text-center text-primary">{email}</span>
            </h3>

            <Otp length={6} onOtpSubmit={(otp) => setOtp(otp)} />

            <div className="d-flex align-items-center justify-content-between gap-3 mt-4 ">
              <div>
                <button onClick={handleResendOTP} className="btn btn-danger">
                  Resend OTP
                </button>
              </div>
              <div className="d-flex gap-3">
                <button
                  onClick={handleOtpSubmit}
                  className="btn btn-success"
                  disabled={otp.length !== 6}
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => setOtpModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
