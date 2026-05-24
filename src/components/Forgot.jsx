import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Logo } from "./Logo";
import { WelcomeComponent } from "./WelcomeComponent";
import { AccountHelper } from "./AccountHelper";
import { forgot } from "../services/ApiServiceProvider";
import Toaster from "./Toaster";
import { GlobalContext } from "../services/GlobalContext";
// import { Header } from "./Header";
import { NormalHeader } from "./NormalHeader";

export const Forgot = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { email } = formData;
    let newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
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

  const handleForgotSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await forgot(formData);
      // console.log("response forgot ",response);
      if (response.data.isSuccess) {
        dispatch({ type: "Email_Setter", payload: formData })
        navigate("/resetpassword");
        setTimeout(() => {
          Toaster(response.data.data.msg, response.data.isSuccess);
        }, 800);
      } else {
        Toaster(response.data.data.msg, response.data.isSuccess);
        setFormData({
          email: "",
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
            heading="Forgot"
            button="Submit"
            text="Don’t have an account?"
            bottomin="Sign Up"
            Forgot={false}
            value={formData}
            onChange={handleChange}
            onSubmit={handleForgotSubmit}
            isEmail={true}
            handleSign={handleSign}
            forgotSection={true}
            errors={errors}
          />
        </div>
      </div>
    </>
  );
};
