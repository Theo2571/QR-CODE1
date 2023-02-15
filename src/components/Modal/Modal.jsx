import React from "react";
import s from "./Modal.module.css";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = ({ active, setActive, children, style }) => {
  return (
    <div
      className={active ? `${s.modal} ${s.active} ` : `${s.modal}`}
      onClick={() => setActive(false)}
    >
      <div
        className={
          active ? `${s.modal__content} ${s.active} ` : `${s.modal__content}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.print}>
          <ClearIcon
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 25,
              margin: "0 0 0 350px",
              pointerEvents: "all",
              zIndex: 99999,
            }}
            {...style}
            onClick={() => setActive(false)}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
