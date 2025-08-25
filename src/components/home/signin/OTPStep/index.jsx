import React, { useState } from "react";
import CustomOTP from "../../../ui/OTP";
import "./OTPStep.css";
import { useForm } from "react-hook-form";
const OTPStep = () => {
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [formError, setFormError] = useState("");
  const otpString = otpValues.join("");
  const onSubmit = (data) => {
    if (otpString.length < 6) {
      setFormError("ادخل الكود كاملا 6 ارقام");
      return;
    }
    console.log("OTP Submitted:", data.otp);
  };
  return (
    <div className="otp-step">
      <div className="otp-header">
        <h1>ادخل كود الأمان</h1>
        <h1>ادخل الكود اللي وصلك على xxx</h1>
      </div>
      <form className="otp-form">
        <div className="otp-container">
          <div>
            <div className="otp-inputs">
              <CustomOTP
                onChangeLogic={() => {
                  if (otpString.length == 6) setFormError("");
                }}
                values={otpValues}
                setValues={setOtpValues}
              />
            </div>
            {formError && <p style={{ color: "red" }}>{formError}</p>}
          </div>
          <div className="send-otp">
            <button className="resend-code">ارسل الكود مجددا</button>
          </div>

          <button type="button" onClick={onSubmit}>
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPStep;
