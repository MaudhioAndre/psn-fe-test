"use client";

import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { renderHeader } from "./TableDataHeader";
import { rowNumberTemplate, actionBodyTemplate } from "./TableDataTemplates";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useCommentFilters } from "./useCommentFilters";
import { useCommentDeletion } from "./useCommentDeletion";

export default function TableData({ comments }) {
  const toast = useRef(null);
  const router = useRouter();

  const { filters, onGlobalFilterChange } = useCommentFilters();
  const {
    deleteDialogVisible,
    selectedCommentId,
    confirmDeleteComment,
    deleteComment,
    setDeleteDialogVisible,
  } = useCommentDeletion(router, toast);

  return (
    <>
      <Toast ref={toast} />
      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={deleteComment}
      />
      <DataTable
        value={comments}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        filters={filters}
        tableStyle={{ minWidth: "60rem" }}
        style={{ margin: "20px" }}
        header={renderHeader(filters, onGlobalFilterChange)}
      >
        <Column
          header="No"
          body={rowNumberTemplate}
          style={{ width: "5%" }}
          headerStyle={{ background: "black", color: "white" }}
        />
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search Name..."
          style={{ width: "25%" }}
          headerStyle={{ background: "black", color: "white" }}
        />
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search Email..."
          style={{ width: "25%" }}
          headerStyle={{ background: "black", color: "white" }}
        />
        <Column
          field="body"
          header="Body"
          filter
          filterPlaceholder="Search Body..."
          style={{ width: "25%" }}
          headerStyle={{ background: "black", color: "white" }}
        />
        <Column
          header="Actions"
          body={(rowData) => actionBodyTemplate(rowData, confirmDeleteComment)}
          style={{ width: "15%" }}
          headerStyle={{ background: "black", color: "white" }}
        />
      </DataTable>
    </>
  );
}