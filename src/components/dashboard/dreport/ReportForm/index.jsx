import React from "react";
import CustomFileUpload from "../../../ui/FileUpload";
import CustomSwitch from "../../../ui/SwitchInput";
import { useState } from "react";
import Modal from "../../../ui/Modal";
const ReportForm = ({ mode, open, setOpen }) => {
  const [checkSwitch, setCheckSwitch] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal title="اضافة كوبون جديد" isOpen={open} onClose={handleClose}>
      <form>
        <div className="input-content">
          <label htmlFor="">كود الخصم</label>
          <input type="text" />
        </div>
        <div>
          <CustomSwitch checked={checkSwitch} onChange={() => setCheckSwitch((prev) => !prev)} />
        </div>

        <CustomFileUpload />
        <button>submit</button>
      </form>
    </Modal>
  );
};

export default ReportForm;
