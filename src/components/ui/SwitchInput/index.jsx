import React from "react";
import "./Switch.css";

const CustomSwitch = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  style = {},
}) => {
  const handleToggle = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={`switch ${className}`} style={style}>
      <input type="checkbox" checked={checked} onChange={handleToggle} disabled={disabled} />
      <span className="slider"></span>
    </label>
  );
};

export default CustomSwitch;
