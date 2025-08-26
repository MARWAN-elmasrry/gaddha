import React, { useEffect } from "react";
import CustomFileUpload from "../../../ui/FileUpload";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import { useForm } from "react-hook-form";
import CustomSwitch from "../../../ui/SwitchInput";

const CouponForm = ({ mode = "create", initialData, open, setOpen }) => {
  const [isFixedCoupon, setIsFixedCoupon] = useState(true);
  console.log("initialData", initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      couponCode: "",
      perUserLimit: "",
      userLimit: "",
      discount: "",
      ...(mode === "edit" && initialData
        ? {
            couponCode: initialData.couponCode || "",
            perUserLimit: initialData.perUserLimit || "",
            userLimit: initialData.userLimit || "",
            discount: initialData.discount || "",
          }
        : {}),
    },
  });

  // Update form values when initialData changes in edit mode
  React.useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        couponCode: initialData.couponCode || "",
        perUserLimit: initialData.perUserLimit || "",
        userLimit: initialData.userLimit || "",
        discount: initialData.discount || "",
      });
      setIsFixedCoupon(initialData.type === "fixed");
    }
  }, [mode, initialData, reset]);
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    console.log("files", data);
  };
  const title = mode === "create" ? "اضافة كوبون جديد" : "تعديل كوبون";
  return (
    <Modal title={title} isOpen={open} onClose={handleClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">كود الخصم</label>
          <input type="text" {...register("couponCode", { required: "كود الخصم مطلوب" })} />
          {errors.couponCode && <p style={{ color: "red" }}>{errors.couponCode.message}</p>}
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">حدد الاستخدام على اليوزر</label>
          <input
            type="number"
            {...register("perUserLimit", {
              required: "هذا الحقل مطلوب",
            })}
          />
          {errors.perUserLimit && <p style={{ color: "red" }}>{errors.perUserLimit.message}</p>}
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">نسبة الخصم</label>
          <input type="number" {...register("discount", { required: "كود الخصم مطلوب" })} />
          {errors.discount && <p style={{ color: "red" }}>{errors.discount.message}</p>}
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">حدد الاستخدام العام</label>
          <input
            type="number"
            {...register("userLimit", {
              required: "هذا الحقل مطلوب",
            })}
          />
          {errors.userLimit && <p style={{ color: "red" }}>{errors.userLimit.message}</p>}
        </div>
        <div>
          <CustomSwitch
            checked={!isFixedCoupon}
            onChange={() => setIsFixedCoupon((prev) => !prev)}
          />
          <span style={{ fontSize: "18px" }}>الخم مبلغ ثابت</span>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type="submit" class="submit-button">
            {mode === "create" ? "اضافة" : "تعديل"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CouponForm;
