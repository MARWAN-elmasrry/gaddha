import "./cStyle.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendMessage } from "../../../api/services/userService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();
  const { loginType, user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loginType != "user") navigate("/login");
    try {
      await sendMessage(data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    reset();
  };
  useEffect(() => {
    if (loginType === "user") {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [loginType, reset]);
  return (
    <div className="contact">
      <div className="container">
        <div className="cont-cont">
          <h1>تواصل معنا</h1>
          <h3>تواصل معنا لأي سؤال, طلب عمل, أو إستفسار</h3>
          <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="start-input-row">
              <span className="start-icon">
                <img src="./offerv.png" alt="" />
              </span>
              <input
                className="start-input"
                type="text"
                placeholder="الاسم"
                dir="rtl"
                disabled={loginType == "user"}
                {...register("name", { required: "الاسم مطلوب" })}
              />
            </div>
            {errors.name && <p style={{ color: "red", margin: 0 }}>{errors.name.message}</p>}

            <div className="start-input-row">
              <span className="start-icon">
                <img src="./offerv.png" alt="" />
              </span>
              <input
                className="start-input"
                type="email"
                placeholder="البريد الإلكتروني"
                dir="rtl"
                disabled={loginType == "user"}
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "صيغة البريد الإلكتروني غير صحيحة",
                  },
                })}
              />
            </div>
            {errors.email && <p style={{ color: "red", margin: 0 }}>{errors.email.message}</p>}

            <div className="start-input-row">
              <span className="start-icon">
                <img src="./offerv.png" alt="" />
              </span>
              <input
                className="start-input"
                type="text"
                placeholder="رقم الهاتف"
                dir="rtl"
                disabled={loginType == "user"}
                {...register("phone", {
                  required: "رقم الهاتف مطلوب",
                  pattern: {
                    value: /^[0-9+\-\s]{7,15}$/,
                    message: "رقم الهاتف غير صحيح",
                  },
                })}
              />
            </div>
            {errors.phone && <p style={{ color: "red", margin: 0 }}>{errors.phone.message}</p>}

            <div className="start-input-row mass-cont">
              <span className="start-icon">
                <img src="./offerv.png" alt="" />
              </span>
              <input
                className="start-input mass-inp"
                type="text"
                placeholder="الرسالة"
                dir="rtl"
                {...register("content", {
                  required: "الرسالة مطلوبة",
                  minLength: { value: 5, message: "الرسالة قصيرة جدًا" },
                })}
              />
            </div>
            {errors.message && <p style={{ color: "red", margin: 0 }}>{errors.message.message}</p>}

            <div className="start-btn">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
              </button>
            </div>
            {isSubmitSuccessful && (
              <p style={{ color: "green", marginTop: "10px" }}>تم إرسال الرسالة بنجاح!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
