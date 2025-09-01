import { useState } from "react";
import Modal from "../../../ui/Modal";
import { useForm } from "react-hook-form";
import { createReport } from "../../../../api/services/userService";

const ReportForm = ({ open, setOpen, questionId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
    },
  });
  const handleClose = async () => {
    setOpen(false);
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await createReport({ description: data.description, questionId });
    } catch (error) {
      console.error("Error creating report:", error);
    }
    setOpen(false);
  };
  const title = `ارسال بلاغ`;
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
        <div className="input-content" style={{ width: "100%" }}>
          <label htmlFor="">الوصف</label>
          <textarea
            {...register("description", {
              required: "الوصف مطلوب",
              validate: (value) => value.length > 10 || "يجب أن يكون الوصف أطول من 10 أحرف",
            })}
          />
          {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type="submit" class="submit-button">
            ابلاغ
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportForm;
