import React, { useEffect } from "react";
import CustomFileUpload from "../../../ui/FileUpload";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import { useForm } from "react-hook-form";
import { getQuestionById } from "../../../../api/services/admingService";

const ReportForm = ({ open, setOpen, questionId }) => {
  const [questionFile, setQuestionFile] = useState([]);
  const [answerFile, setAnswerFile] = useState([]);

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
    if (!questionId) return;
    const fetchData = async () => {
      try {
        const question = await getQuestionById(questionId);

        console.log("Question data:", question);
        // Ensure reset is called after data is loaded
        reset({
          question: question?.text || "",
          answer: question?.answer || "",
          level: question?.difficulty || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [questionId, reset]);
  const onSubmit = (data) => {
    console.log(data);
    console.log("files", questionFile, answerFile);
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

        {/* <div>
          <CustomSwitch checked={checkSwitch} onChange={() => setCheckSwitch((prev) => !prev)} />
        </div> */}
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">ملف السؤال</label>
          <CustomFileUpload selectedFiles={questionFile} setSelectedFiles={setQuestionFile} />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">ملف الاجابة</label>
          <CustomFileUpload selectedFiles={answerFile} setSelectedFiles={setAnswerFile} />
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
