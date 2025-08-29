import React, { useEffect } from "react";
import CustomFileUpload from "../../../ui/FileUpload";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import { set, useForm } from "react-hook-form";
import { editQuestion, getQuestionById } from "../../../../api/services/admingService"; // هو ده السطر ++++++++++++++=============
import { toast } from "react-toastify";

const ReportForm = ({ open, setOpen, question }) => {
  const [questionFile, setQuestionFile] = useState([]);
  const [answerFile, setAnswerFile] = useState([]);
  const questionId = question?._id;
  console.log("questionFile from Question form:", questionFile);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
      level: "",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!question?._id) return;

    reset({
      question: question?.text || "",
      answer: question?.answer || "",
      level: question?.difficulty || "",
    });
  }, [questionId, reset]);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("questionId", questionId);
      formData.append("text", data.question);
      formData.append("answer", data.answer);
      formData.append("difficulty", data.level);
      if (questionFile.length > 0) {
        formData.append("questionImage", questionFile[0]);
      }

      if (answerFile.length > 0) {
        formData.append("answerImage", answerFile[0]);
      }
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await editQuestion(formData);

      toast.success("نجح التعديل");
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("خطا غى التعديل");
    }
    setOpen(false);
  };
  const title = `تعديل السؤال  `;
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
          <label htmlFor="">السؤال</label>
          <input type="text" {...register("question", { required: "السؤال مطلوب" })} />
          {errors.question && <p style={{ color: "red" }}>{errors.question.message}</p>}
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">الاجابة</label>
          <input
            type="text"
            {...register("answer", {
              required: "الإجابة مطلوبة",
              minLength: { value: 3, message: "الإجابة قصيرة جدًا" },
            })}
          />
          {errors.answer && <p style={{ color: "red" }}>{errors.answer.message}</p>}
        </div>
        <div className="input-content" style={{ width: "100%" }}>
          <label htmlFor="level-select">مستوى السؤال</label>
          <select id="level-select" {...register("level", { required: "اختار مستوى للسؤال" })}>
            <option value="">اختر المستوى</option>
            <option value="easy">سهل</option>
            <option value="medium">متوسط</option>
            <option value="hard">صعب</option>
          </select>
          {errors.level && <p style={{ color: "red" }}>{errors.level.message}</p>}
        </div>

        <div className="input-content" style={{ width: "49%" }}>
          <a href={question?.questionImage} target="_blank" rel="noopener noreferrer">
            عرض صورة السؤال
          </a>
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <a href={question?.answerImage} target="_blank" rel="noopener noreferrer">
            عرض صورة الاجابة
          </a>{" "}
        </div>

        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">صورة السؤال</label>
          <CustomFileUpload
            accept="image/*"
            selectedFiles={questionFile}
            setSelectedFiles={setQuestionFile}
          />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">صورة الاجابة</label>
          <CustomFileUpload
            accept="image/*"
            selectedFiles={answerFile}
            setSelectedFiles={setAnswerFile}
          />
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <button type="submit" class="submit-button">
            تعديل
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportForm;
