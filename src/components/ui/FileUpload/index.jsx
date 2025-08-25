import React, { useRef, useState } from "react";
import "./FileUpload.css";

const CustomFileUpload = ({
  divText = " رفع الملف",
  accept = "*",
  multiple = false,
  style = {},
  className = "",
  onFileSelect,
}) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const selected = multiple ? Array.from(files) : [files[0]];
      setSelectedFiles(selected);

      if (onFileSelect) {
        onFileSelect(multiple ? selected : selected[0]);
      }
    }
  };

  return (
    <div className="custom-file-upload">
      {/* إدخال مخفي */}
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={handleChange}
      />

      {/* عنصر مخصص */}
      <div onClick={handleClick} className={`${className}`} style={style}>
        {/* مؤشر الملفات المحددة */}
        {selectedFiles.length > 0 ? (
          <div className="file-indicator" style={{ fontSize: "14px", color: "#f7f2f2ff" }}>
            {multiple ? `${selectedFiles.length} ملف/ملفات تم اختيارها` : selectedFiles[0].name}
          </div>
        ) : (
          divText
        )}
      </div>
    </div>
  );
};

export default CustomFileUpload;
