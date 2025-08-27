import "./cStyle.css";
import React from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
      reset,
    } = useForm();

    const onSubmit = (data) => {
      // You can handle the form submission here (e.g., send to API)
      alert("تم إرسال الرسالة بنجاح!");
      reset();
    };

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
                  placeholder="اسم الفريق الأول"
                  dir="rtl"
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
                  {...register("message", {
                    required: "الرسالة مطلوبة",
                    minLength: { value: 5, message: "الرسالة قصيرة جدًا" },
                  })}
                />
              </div>
              {errors.message && (
                <p style={{ color: "red", margin: 0 }}>{errors.message.message}</p>
              )}

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
};

export default Contact;
