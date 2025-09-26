import React, { useState, useEffect } from "react";
import CustomOTP from "../../../ui/OTP";
import "./OTPStep.css";
import { useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../../../../api/services/userService";

const OTPStep = ({ phone, countryCode, sentBefore = false }) => {
  const navigate = useNavigate();

  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [formError, setFormError] = useState("");
  const [timer, setTimer] = useState(60);

  const otpString = otpValues.join("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (sentBefore) handleResendOtp();
  }, []);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async () => {
    if (otpString.length < 6) {
      setFormError("ادخل الكود كاملا 6 ارقام");
      return;
    }
    setFormError("");
    try {
      await verifyOtp({ otp: otpString, countryCode, phone });
      navigate("/login");
    } catch {
      setFormError("خطأ في التحقق من OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ countryCode, phone });
      setFormError("تم إرسال الكود مجددًا");
      setTimer(60);
    } catch (error) {
      setFormError("خطأ أثناء إعادة إرسال الكود");
    }
  };

  return (
    <div className="otp-step">
      <div className="otp-header">
        <h1>ادخل كود الأمان</h1>
        <h1>تم ارسال رمز التحقق إلى ايميلك ورقم هاتفك</h1>
        <h2 style={{ color: "#883813" }}>يرجى عدم الخروج حتى الانتهاء من التحقق</h2>
      </div>
      <form className="otp-form" onSubmit={(e) => e.preventDefault()}>
        <div className="otp-container">
          <div>
            <div className="otp-inputs">
              <CustomOTP
                onChangeLogic={() => {
                  if (otpString.length === 6) setFormError("");
                }}
                values={otpValues}
                setValues={setOtpValues}
              />
            </div>
            {formError && (
              <p style={{ color: "rgba(249, 231, 197, 1)", fontSize: 30 }}>{formError}</p>
            )}
          </div>

          <div className="send-otp">
            <button
              type="button"
              className="resend-code"
              onClick={handleResendOtp}
              disabled={timer > 0}
            >
              {timer > 0
                ? `يمكنك إعادة الإرسال بعد ${Math.floor(timer / 60)}:${timer % 60 < 60 ? "0" : ""}${
                    timer % 60
                  }`
                : "ارسل الكود مجددًا"}
            </button>
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
