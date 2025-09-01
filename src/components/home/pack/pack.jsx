import { useState } from "react";
import { createPayment } from "../../../api/services/userService";
import Modal from "../../ui/Modal";
import "./pStyle.css";
import GlareHover from "./GlareHover";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Pack = () => {
  const loginType = localStorage.getItem("loginType");
  if (loginType === "admin") {
    return <></>;
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      street1: "",
      city: "",
      state: "",
      country: "",
      postcode: "",
    },
  });
  const onSubmit = async (data) => {
    setStep(2);
    try {
      const response = await createPayment({
        price,
        street1: data.street1,
        city: data.city,
        state: data.state,
        country: data.country,
        postcode: data.postcode,
      });

      const script = document.createElement("script");
      script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${response?.checkoutId}`;
      script.async = true;

      const paymentWidgetDiv = document.getElementById("payment-widget");
      if (paymentWidgetDiv) {
        paymentWidgetDiv.innerHTML = "";
        paymentWidgetDiv.appendChild(script);
      } else {
        document.body.appendChild(script);
      }
    } catch (error) {
      toast.error("خطأ في إنشاء الدفع");
      handleClose();
    }
  };

  const pay = async (price) => {
    setStep(1);
    setPrice(price);

    setOpen(true);
  };
  return (
    <>
      <Modal title={`الدفع - ${price} ريال`} isOpen={open} onClose={handleClose}>
        <div className="dialog-header">
          <div className="stepper">
            <div className={`step ${step === 1 ? "active" : step > 1 ? "done" : ""}`}>
              <span className="circle">1</span> <span>العنوان</span>
            </div>
            <div className={`line  ${step === 2 ? "active" : ""}`}></div>
            <div className={`step ${step === 2 ? "active" : ""}`}>
              <span className="circle">2</span> <span>الدفع</span>
            </div>
          </div>
        </div>
        <div className="dialog-content">
          {step === 1 && (
            <form onSubmit={handleSubmit(onSubmit)} className="address-form">
              <label>
                الشارع
                <input
                  type="text"
                  name="street1"
                  {...register("street1", { required: "اسم الشارع مطلوب" })}
                />
                {errors.street1 && <p style={{ color: "red" }}>{errors.street1.message}</p>}
              </label>
              <label>
                المدينة
                <input
                  type="text"
                  name="city"
                  {...register("city", { required: "اسم المدينة مطلوب" })}
                />
                {errors.city && <p style={{ color: "red" }}>{errors.city.message}</p>}
              </label>
              <label>
                الولاية
                <input
                  type="text"
                  name="state"
                  {...register("state", { required: "اسم الولاية مطلوب" })}
                />
                {errors.state && <p style={{ color: "red" }}>{errors.state.message}</p>}
              </label>
              <label>
                الدولة
                <input
                  type="text"
                  name="country"
                  {...register("country", { required: "اسم الدولة مطلوب" })}
                />
                {errors.country && <p style={{ color: "red" }}>{errors.country.message}</p>}
              </label>
              <label>
                الرمز البريدي
                <input
                  type="text"
                  name="postcode"
                  {...register("postcode", { required: "الرمز البريدي مطلوب" })}
                />
                {errors.postcode && <p style={{ color: "red" }}>{errors.postcode.message}</p>}
              </label>

              <div className="actions">
                <button type="submit" className="next-btn">
                  التالي
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="payment-form">
              <div id="payment-widget"></div>
              <form
                action="https://gaddha-production.up.railway.app/api/user/callback"
                className="paymentWidgets"
                data-brands="VISA MASTER MADA"
              ></form>
            </div>
          )}
        </div>
      </Modal>

      <div className="pack">
        <div className="container">
          <div className="pack-cont">
            <div className="cards">
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
                <div className="card">
                  <div className="main" onClick={() => pay(14)}>
                    <h5>لعبتين</h5>
                    <div className="price">
                      <div className="price-info">
                        <p>14</p>
                        <img src="./riyal.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="top"></div>
                  <div className="center"></div>
                </div>
              </GlareHover>
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
                <div className="card card2">
                  <div className="main" onClick={() => pay(8)}>
                    <h5>لعبة واحدة</h5>
                    <div className="price">
                      <div className="price-info">
                        <p>8</p>
                        <img src="./riyal.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="top"></div>
                  <div className="center"></div>
                </div>
              </GlareHover>
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
                <div className="card card3">
                  <div className="main" onClick={() => pay(75)}>
                    <h5>ألعاب 10</h5>
                    <div className="price">
                      <div className="price-info">
                        <p>70</p>
                        <img src="./riyal.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="top"></div>
                  <div className="center"></div>
                </div>
              </GlareHover>
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
                <div className="card card4">
                  <div className="main" onClick={() => pay(35)}>
                    <h5>5 ألعاب</h5>
                    <div className="price">
                      <div className="price-info">
                        <p>37</p>
                        <img src="./riyal.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="top">
                    <h3>الأكثر مبيعا</h3>
                  </div>
                  <div className="center"></div>
                </div>
              </GlareHover>
            </div>
            <img src="./offers.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pack;
