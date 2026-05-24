import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Logo } from "./Logo";
import { WelcomeComponent } from "./WelcomeComponent";
import { AccountHelper } from "./AccountHelper";
import { resetPassword } from "../services/ApiServiceProvider";
import Toaster from "./Toaster";
import { GlobalContext } from "../services/GlobalContext";
// import { Header } from "./Header";
import { NormalHeader } from "./NormalHeader";

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { state } = useContext(GlobalContext);
  const { email } = state.isResetEmailSet || {};

  // console.log("state", state);

  const [formData, setFormData] = useState({
    email: email || "",
    otp: "",
    new_password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { email, otp, new_password } = formData;
    let newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!otp) {
      newErrors.otp = "6 length otp is required";
    } else if (otp.length < 6 || otp.length > 6) {
      newErrors.otp = "6 length otp is required";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$#!%*?&]{8,}$/;
    if (!new_password) {
      newErrors.new_password = "Password is required";
    } else if (!(new_password.length > 7)) {
      newErrors.new_password = "Password length should be at least 8 characters.";
    } else if (!(new_password.length < 21)) {
      newErrors.new_password = "Password length should be not be greater than 20 characters.";
    } else if (!passwordRegex.test(new_password)) {
      newErrors.new_password =
        "Password must include 8 characters long, uppercase, lowercase, number, and special character";
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
    navigate("/login");
  };

  const handleResetSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await resetPassword(formData);
      // console.log("response reset", response);
      if (response.data.isSuccess) {
        navigate("/login");

        setTimeout(() => {
          Toaster(response.data.data.msg, true);
        }, 800);
      } else {
        Toaster(response.data.data.msg, false);
        setFormData({
          email: "",
          otp: "",
          new_password: "",
        });
      }
    } catch (error) {
      Toaster("Somethings went wrong. Please try after some time.", false);
    }
  };

  return (
    <>
      <div className="container p-2">
  
{/* <Header isLoggedIn={state.isLoggedIn}/> */}

<NormalHeader/>
        
        <div className="row py-2 mt-5">
          <div className="col">
            <WelcomeComponent name="Welcome To Animal Species Recognizer Demo!" />
          </div>
          <AccountHelper
            heading="Reset Password"
            button="Submit"
            text="or"
            bottomin="Sign Up"
            Forgot={false}
            value={formData}
            onChange={handleChange}
            onSubmit={handleResetSubmit}
            isEmail={true}
            handleSign={handleSign}
            isotp={true}
            forgotSection={true}
            errors={errors}
            isReset={true}
          />
        </div>
      </div>
    </>
  );
};
