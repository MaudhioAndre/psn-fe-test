import { Button } from "primereact/button";

export const rowNumberTemplate = (rowData) => {
  const index = rowData.id;
  return index;
};

export const actionBodyTemplate = (rowData, confirmDeleteComment) => {
  return (
    <Button
      severity="danger"
      label="Delete"
      style={{ borderRadius: "8px" }}
      onClick={() => confirmDeleteComment(rowData.id)}
    />
  );
};
