import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeComponent } from "./WelcomeComponent";
import { AccountHelper } from "./AccountHelper";
import {
  decodeToken,
  signup,
  verification,
} from "../services/ApiServiceProvider";
import { Loader } from "./Loader";
import { GlobalContext } from "../services/GlobalContext";
import Toaster from "./Toaster";
import { TermsAndCondition } from "./TermsAndCondition";
import { OtpModule } from "./otpComponents/OtpModule";
import { NormalHeader } from "./NormalHeader";

export const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  const [showTermsAndCondition, setShowTermsAndCondition] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
    tandc_accepted: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const { email, fullname, password } = formData;
    let newErrors = {};
  
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }
  
  
    const nameRegex = /^[a-zA-Z]+(([',.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;

    if (!fullname) {
      newErrors.fullname = "Full name is required";
    } else if (fullname.length >= 50) {
      newErrors.fullname = "Full name must be less than 50 characters";
    } else if (!nameRegex.test(fullname)) {
      newErrors.fullname = "Full name contains invalid characters";
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$#!%*?&]{8,}$/;
  
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!(password.length > 7)) {
      newErrors.password = "Password length should be at least 8 characters.";
    } else if (!(password.length < 21)) {
      newErrors.password = "Password length should be not be greater than 20 characters.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must include 8 characters long, uppercase, lowercase, number, and special character";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // console.log("errors", errors);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors("");
  };

  const handleSign = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // console.log("validateForm", validateForm());

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const data = {
      email: formData.email,
      fullname: formData.fullname,
      password: formData.password,
      tandc_accepted: formData.tandc_accepted,
    };
    try {
      const response = await signup(data);
      // console.log("register response", response);
      if (response.data.isSuccess) {
        if (response.data.data.user_exist) {
          setIsLoading(false);
          Toaster(response.data.data.msg, response.data.isSuccess);
        } else {
          setIsLoading(false);
          setOtpModalOpen(true);
          Toaster(response.data.data.msg, response.data.isSuccess);
        }
      } else {
        Toaster(response.data.data.msg, response.data.isSuccess);
        // setFormData({
        //   email: "",
        //   fullname: "",
        //   password: "",
        //   tandc_accepted: false,
        // });
      }
    } catch (error) {
      Toaster("Somethings went wrong. Please try after some time.", false);
    } finally {
      setIsLoading(false);
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
          Toaster("Login successful...!", response.data.isSuccess);
        }, 500);
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
      // console.log("handleResendOTP=>", response);
      if (response.data.isSuccess) {
        Toaster("OTP Send Successfully.", true);
      } else {
        Toaster(response.data.data.msg || "Please Try After Some Time.", false);
      }
    } catch (error) {}
  };

  const handleRedireactTermsandCondition = () => {
    setShowTermsAndCondition(true);
  };

  const onClosed = () => {
    setShowTermsAndCondition(false);
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
            heading="Sign Up"
            button="Sign Up"
            text="Already have an account?"
            bottomin="Log In"
            Forgot={false}
            value={formData}
            onChange={handleChange}
            onSubmit={handleRegister}
            disabled={!formData.tandc_accepted}
            isEmail={true}
            handleSign={handleSign}
            forgotSection={false}
            isfullName={true}
            errors={errors}
            isTermsAndCondition={true}
            handleRedireactTermsandCondition={handleRedireactTermsandCondition}
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

      {showTermsAndCondition && (
        <>
          <TermsAndCondition onClosed={onClosed} />
        </>
      )}
    </>
  );
};
