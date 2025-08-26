import React from "react";
import CustomFileUpload from "../../../ui/FileUpload";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import { useForm } from "react-hook-form";

const CategoryForm = ({ mode = "create", initialData, open, setOpen }) => {
  const [questionsAnswersFile, setQuestionsAnswersFile] = useState([]);
  const [questionImages, setQuestionImages] = useState([]);
  const [answersImages, setAnswersImages] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: initialData ? initialData.categoryName : "",
      description: initialData ? initialData.description : "",
      group: initialData ? initialData.group : "",
    },
  });
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log("files", questionsAnswersFile, questionImages);
  };
  const title = mode === "create" ? "اضافة فئة جديدة" : "تعديل فئة";
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
          <label htmlFor="">اسم الفئة</label>
          <input type="text" {...register("categoryName", { required: "اسم الفئة مطلوب" })} />
          {errors.categoryName && <p style={{ color: "red" }}>{errors.categoryName.message}</p>}
        </div>
        <div className="input-content" style={{ width: "100%" }}>
          <label htmlFor="">الوصف</label>
          <textarea
            {...register("description", {
              required: "الوصف مطلوب",
              minLength: { value: 3, message: "الوصف قصير جدًا" },
            })}
          />
          {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        </div>
        <div className="input-content" style={{ width: "100%" }}>
          <label htmlFor="level-select"> المجموعة</label>
          <select id="level-select" {...register("group", { required: "اختار مجموعة للسؤال" })}>
            <option value="">اختر المجموعة</option>
            <option value="group1">مجموعة 1</option>
            <option value="group2">مجموعة 2</option>
            <option value="group3">مجموعة 3</option>
          </select>
          {errors.group && <p style={{ color: "red" }}>{errors.group.message}</p>}
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">ملف الاسئلة والاجوبة</label>
          <CustomFileUpload
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            selectedFiles={questionsAnswersFile}
            setSelectedFiles={setQuestionsAnswersFile}
          />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">صور الاسئلة</label>
          <CustomFileUpload
            accept="image/*"
            multiple={true}
            selectedFiles={questionImages}
            setSelectedFiles={setQuestionImages}
          />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">صور الاجوبة</label>
          <CustomFileUpload
            accept="image/*"
            multiple={true}
            selectedFiles={answersImages}
            setSelectedFiles={setAnswersImages}
          />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">صور الفئة</label>
          <CustomFileUpload
            accept="image/*"
            multiple={true}
            selectedFiles={categoryImages}
            setSelectedFiles={setCategoryImages}
          />
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

export default CategoryForm;
