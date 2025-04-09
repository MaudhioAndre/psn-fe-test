import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export const DeleteConfirmationDialog = ({ visible, onHide, onConfirm }) => {
  const footer = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
      />
      <Button label="Yes" icon="pi pi-check" onClick={onConfirm} autoFocus />
    </>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: "50vw" }}
      header="Confirm Delete"
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span>Are you sure you want to delete this comment?</span>
      </div>
    </Dialog>
  );
};