import { useState, useRef, useEffect } from "react";
import { InputField } from "./InputField";
import openeye from "../assets/openeye.png";
import closedeye from "../assets/closedeye.png";

export const AccountHelper = ({
  heading,
  button,
  text,
  bottomin,
  Forgot,
  value,
  onChange,
  onSubmit,
  isEmail,
  handleSign,
  handleForgot,
  forgotSection,
  isReset,
  isotp,
  resendOTPHandler,
  isfullName,
  isResendSection,
  disabled,
  isTermsAndCondition,
  handleRedireactTermsandCondition,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="col  pseudo-partial-border h-100">
        <div className="px-4">
          <div className="row loginbox p-5 rounded-5 gap-4">
            <div className="row mb-4">
              <h3 className="fs-1 p-0 m-0 Rethink Sans">{heading}</h3>
            </div>
            {isEmail && (
              <div className="row mt-4">
                <InputField
                  type="email"
                  index={0}
                  name="email"
                  id="email"
                  value={value.email}
                  onChange={onChange}
                  placeholder="Email ID*"
                  className="p-2 rounded-2 form-control"
                  inputRef={emailInputRef}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            )}

            {isfullName && (
              <>
                <div className="row">
                  <InputField
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={value.fullname}
                    onChange={onChange}
                    placeholder="Enter your full name*"
                    className="p-2 rounded-2 form-control"
                  />
                  {errors.fullname && (
                    <span className="error">{errors.fullname}</span>
                  )}
                </div>
              </>
            )}

            {!forgotSection && (
              <>
                <div className="row position-relative">
                  <InputField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={value.password}
                    onChange={onChange}
                    id="password"
                    placeholder="Password*"
                    className="p-2 rounded-2 form-control"
                  />

                  <span>
                    <img
                      src={showPassword ? openeye : closedeye}
                      alt="openeye"
                      className="position-absolute eyestyle"
                      onClick={(e) => setShowPassword(!showPassword)}
                      style={{cursor:"pointer"}}
                    />
                  </span>
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </>
            )}

            {isotp && (
              <>
                <div className="row">
                  <InputField
                    type="text"
                    name="otp"
                    value={value.otp}
                    onChange={onChange}
                    placeholder="Enter your otp*"
                    className="p-2 rounded-2 form-control"
                  />
                  {errors.otp && <span className="error">{errors.otp}</span>}
                </div>
              </>
            )}

            {isReset && (
              <>
                <div className="row position-relative">
                  <InputField
                    type={showPassword ? "text" : "password"}
                    name="new_password"
                    value={value.new_password}
                    onChange={onChange}
                    placeholder="Enter New Password*"
                    className="p-2 rounded-2 form-control"
                  />

                  <span>
                    <img
                      src={showPassword ? openeye : closedeye}
                      alt="openeye"
                      className="position-absolute eyestyle"
                      onClick={(e) => setShowPassword(!showPassword)}
                      style={{cursor:"pointer"}}
                    />
                  </span>

                  {errors.new_password && (
                    <span className="error">{errors.new_password}</span>
                  )}
                </div>
              </>
            )}

            {isResendSection && (
              <div className="row">
                <div className="col d-flex justify-content-between">
                  <span>OTP Valid for 2 min</span>
                  <span
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={resendOTPHandler}
                  >
                    Resend OTP
                  </span>
                </div>
              </div>
            )}

            {Forgot && (
              <div
                className="row justify-content-end text-danger underline"
                style={{ cursor: "pointer" }}
                onClick={handleForgot}
              >
                Forgot password?
              </div>
            )}

            {isTermsAndCondition && (
              <div className="row">
                <div className="d-flex justify-content-start align-items-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id="termsandcondition"
                    checked={value.tandc_accepted}
                    onChange={(e) =>
                      onChange({
                        target: {
                          name: "tandc_accepted",
                          value: e.target.checked,
                        },
                      })
                    }
                  />

                  <label
                    htmlFor="termsandcondition"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    &nbsp;<span>I agree to the</span> &nbsp;
                  </label>
                  <span
                    style={{
                      color: "#1763B5",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={handleRedireactTermsandCondition}
                  >
                    Terms and Condition
                  </span>
                </div>
              </div>
            )}

            <div className="row mt-2 mb-4">
              <button
                className="btn btn-primary fs-4 rounded-5"
                onClick={onSubmit}
                disabled={disabled}

              >
                {button}
              </button>
            </div>

            <div className="row mt-5">
              <div className="row justify-content-center fs-4">{text}</div>
              <div
                className="row justify-content-center fs-4 text-danger underline"
                onClick={handleSign}
                style={{ cursor: "pointer" }}
              >
                {bottomin}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
