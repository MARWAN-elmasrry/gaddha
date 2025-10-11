import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const ImageModal = ({ title, isOpen, onClose, children, style, className = "" }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const modalContent = (
    <div className="image-modal" onClick={onClose}>
      <div
        className={`modal-container ${className}`}
        style={{
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">
          <div>{title}</div>
          <svg
            onClick={onClose}
            width="20"
            height="20"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L34 34M4 34L34 4"
              stroke="#883813"
              stroke-width="7.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="modal-passed-content">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ImageModal;
