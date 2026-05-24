import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeComponent } from "./WelcomeComponent";
import { AccountHelper } from "./AccountHelper";
import {
  login,
  decodeToken,
  verification,
  resendOTP,
} from "../services/ApiServiceProvider";
import { GlobalContext } from "../services/GlobalContext";
import Toaster from "./Toaster";
import { Loader } from "./Loader";
import { OtpModule } from "./otpComponents/OtpModule";
import { NormalHeader } from "./NormalHeader";

export const Login = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(GlobalContext);

  // console.log("login state", state.isLoggedIn);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({});
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const validateForm = () => {
    const { email, password } = formData;
    let newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors("");
  };

  const handleSign = () => {
    navigate("/register");
  };

  const handleForgot = () => {
    navigate("/forgot");
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(formData);

      // console.log("login details", response);
      setIsLoading(false);
      if (response.data.isSuccess) {
        if (response.data.data.isVerified) {
          dispatch({ type: "login" });
          localStorage.setItem("token", response.data.data.token.access_token);

          localStorage.setItem(
            "refreshToken",
            response.data.data.token.refresh_token
          );

          const { sub } = decodeToken(response.data.data.token.access_token);
          dispatch({ type: "SET_USER", payload: sub });
          localStorage.setItem("user", sub);

          navigate("/");
          setTimeout(() => {
            Toaster("Login successful...!", response.data.isSuccess);
          }, 200);
        }
      } else {
        if (!response.data.data.isVerified) {
          setOtpModalOpen(true);
          Toaster(response.data.data.msg, response.data.isSuccess);
        } else {
          Toaster(response.data.data.msg, response.data.isSuccess);
        }
      }
    } catch (error) {
      Toaster("Somethings went wrong. Please try after some time.", false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await verification({ email: formData.email, otp: otp });
      // console.log("handleOtpSubmit=>", response);
      if (response.data.isSuccess) {
        setIsLoading(false);
        dispatch({ type: "login" });
        localStorage.setItem("token", response.data.data.access_token);
        localStorage.setItem("refreshToken", response.data.data.refresh_token);

        const { sub } = decodeToken(
          response.data.data.access_token
        );
        dispatch({ type: "SET_USER", payload: sub });
        localStorage.setItem("user", sub);

        navigate("/");
        setTimeout(() => {
          Toaster("Login successful...!", true);
        }, 800);
      }else{
        Toaster(response.data.data.msg, false);
      }
    } catch (error) {
      Toaster("Something went wrong", false);
    }
  };

  const handleResendOTP = async () => {
    const data = {
      email: formData.email,
    };
    try {
      const response = await resendOTP(data);
      if (response.data.isSuccess) {
        Toaster("OTP Send Successfully.", true);
      } else {
        Toaster(response.data.data.msg || "Please Try After Some Time.", false);
      }
    } catch (error) {}
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container p-2">
        {/* <Header isLoggedIn={state.isLoggedIn} /> */}
        <NormalHeader/>

        <div className="row py-2 mt-5">
          <div className="col">
            <WelcomeComponent name="Welcome To Animal Species Recognizer Demo!" />
          </div>
          <AccountHelper
            heading="Login"
            button="Log In"
            text="Don’t have an account?"
            bottomin="Sign Up"
            Forgot={true}
            value={formData}
            onChange={handleChange}
            onSubmit={handleLogin}
            handleForgot={handleForgot}
            isEmail={true}
            handleSign={handleSign}
            errors={errors}
            forgotSection={false}
            disabled={isLoading}
          />
        </div>
      </div>

      {otpModalOpen && (
        <OtpModule
          email={formData.email}
          otp={otp}
          setOtp={setOtp}
          handleResendOTP={handleResendOTP}
          handleOtpSubmit={handleOtpSubmit}
          setOtpModalOpen={setOtpModalOpen}
        />
      )}
    </>
  );
};
