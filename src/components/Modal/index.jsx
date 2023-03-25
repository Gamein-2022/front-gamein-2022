import React from "react";
import { Modal as MuiModal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";

function Modal({ open, onClose, title, children }) {
  return (
    <MuiModal open={open} onClose={onClose}>
      <div className="modal">
        <div className="modal__modal">
          <div className="modal__title">{title}</div>
          <div className="modal__body">
            <div className="modal__close" onClick={onClose}>
              <CloseIcon />
            </div>
            {children}
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
