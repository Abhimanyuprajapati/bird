import React, { useEffect, useRef, useState } from "react";

export const Otp = ({ length = 6, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (!value) return;

    const values = value.split("").filter((char) => !isNaN(char));

    // console.log("values", values);

    if (values.length === 0) return;

    const newOtp = [...otp];
    let i = index;

    values.forEach((val) => {
      if (i < length) {
        newOtp[i] = val;
        i++;
      }
    });

    setOtp(newOtp);

    // Focus the next empty input
    const nextIndex = newOtp.findIndex((val, idx) => val === "" && idx > index);
    if (nextIndex !== -1) {
      inputRefs.current[nextIndex]?.focus();
    } else if (i <= length - 1) {
      inputRefs.current[i]?.focus();
    }

    const combined = newOtp.join("");
    if (combined.length === length) {
      onOtpSubmit(combined);
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      const firstEmpty = otp.indexOf("");
      if (firstEmpty !== -1) {
        inputRefs.current[firstEmpty]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      if (otp[index]) {
        inputRefs.current[index - 1]?.focus();
        setOtp(newOtp);
      } else if (index > 0) {
        // Move focus to previous field and also clear it
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").trim();
    const values = pasteData
      .split("")
      .filter((char) => !isNaN(char))
      .slice(0, length);

    if (values.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < values.length; i++) {
      newOtp[i] = values[i];
    }

    setOtp(newOtp);

    const combined = newOtp.join("");
    if (combined.length === length) {
      onOtpSubmit(combined);
    }

    const nextIndex = values.length < length ? values.length : length - 1;
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-2 p-4">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(input) => (inputRefs.current[index] = input)}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="text-center border border-gray-300 inputcontroler"
        />
      ))}
    </div>
  );
};


