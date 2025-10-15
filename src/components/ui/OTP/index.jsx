import { useRef, useState } from "react";
import "./OTP.css";

const CustomOTP = ({
  length = 6,
  onComplete,
  className = "",
  inputClassName = "",
  values,
  setValues,
  onChangeLogic,
}) => {
  //   const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }

      if (newValues.every((val) => val !== "")) {
        onComplete && onComplete(newValues.join(""));
      }
    }
    onChangeLogic();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleFocus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length);
  };

  return (
    <div className={`OTP flex gap-2 justify-center ${className}`}>
      {values.map((val, index) => (
        <div key={index} className="input-container">
          <input
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={handleFocus}
            className={` text-center  ${inputClassName}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomOTP;
