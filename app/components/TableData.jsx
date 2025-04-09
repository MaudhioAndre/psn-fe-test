"use client";

import React, { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";

import { FilterMatchMode } from "primereact/api";

import { useRouter } from 'next/navigation';


export default function TableData({ comments }) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    body: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const toast = useRef(null);
  const router = useRouter();


  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={filters["global"]?.value || ""}
            onChange={onGlobalFilterChange}
            placeholder="Cari"
          />
        </span>
      </div>
    );
  };

  const rowNumberTemplate = (rowData, column) => {
    const index = comments.indexOf(rowData) + 1;
    return index;
  };

  const deleteComment = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Sukses",
          detail: `Komentar dengan ID ${id} berhasil dihapus.`,
          life: 3000,
        });

        router.refresh();

      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `Gagal menghapus komentar dengan ID ${id}.`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus komentar:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Terjadi kesalahan saat menghubungi server.",
        life: 3000,
      });
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        severity="danger"
        label="Delete"
        onClick={() => deleteComment(rowData.id)}
      />
    );
  };

  const header = renderHeader();

  return (
    <>
      <Toast ref={toast} />
      <DataTable
        value={comments}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        filters={filters}
        tableStyle={{ minWidth: "60rem" }} // Lebar disesuaikan untuk tombol
        header={header}
      >
        <Column
          header="No"
          body={rowNumberTemplate}
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Cari Nama"
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Cari Email"
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="body"
          header="Body"
          filter
          filterPlaceholder="Cari Isi"
          style={{ width: "25%" }}
        ></Column>
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ width: "15%" }}
        ></Column>
      </DataTable>
    </>
  );
}
