import React from "react";
import Modal from "react-responsive-modal";
import "./style.css";

export const CustomModal = ({ title, open, onCloseModal, onConfirm, children }) => {
  return (
    <Modal open={open} onClose={onCloseModal} classNames={{modal: "custom-modal"}} center>
      <div className="modal-header">
        <h3>{title}</h3>
      </div>
      <div className="modal-body">
        {children}
      </div>
      <div className="modal-footer">
        <button className="btn-primary btn-modal-close" onClick={onCloseModal}>Cancel</button>
        <button className="btn-secondary btn-modal-confirm" onClick={onConfirm}>Close and Apply</button>
      </div>
    </Modal>
  )
};
