import React from "react";
import CustomFileUpload from "../../../ui/FileUpload";
import CustomSwitch from "../../../ui/SwitchInput";
import { useState } from "react";
import Modal from "../../../ui/Modal";
const ReportForm = ({ open, setOpen }) => {
  const [checkSwitch, setCheckSwitch] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const title = `تعديل السؤال 60`;
  const questionValue = "ما اسم هذه المستشفى؟";
  const questionAnswer = "مستشفى الحياة الوطنى";
  return (
    <Modal title={title} isOpen={open} onClose={handleClose}>
      <form
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
          <input type="text" defaultValue={questionValue} />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">الاجابة</label>
          <input type="text" defaultValue={questionAnswer} />
        </div>
        <div className="input-content" style={{ width: "100%" }}>
          <label htmlFor="">مستوى السؤال</label>
          <select name="" id="">
            <option value="">سهل</option>
            <option value="">متوسط</option>
            <option value="">صعب</option>
          </select>
        </div>

        {/* <div>
          <CustomSwitch checked={checkSwitch} onChange={() => setCheckSwitch((prev) => !prev)} />
        </div> */}
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">ملف السؤال</label>
          <CustomFileUpload />
        </div>
        <div className="input-content" style={{ width: "49%" }}>
          <label htmlFor="">ملف الاجابة</label>
          <CustomFileUpload />
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <button class="submit-button">تعديل</button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportForm;
