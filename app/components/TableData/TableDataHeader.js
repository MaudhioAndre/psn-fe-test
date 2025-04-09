import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";

export const renderHeader = (filters, onGlobalFilterChange) => {
  return (
    <div className="flex justify-between">
      <Link href="/create-comment">
        <Button style={{ borderRadius: "8px", backgroundColor:'black', border : 'unset' }}>Create</Button>
      </Link>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filters["global"]?.value || ""}
          onChange={onGlobalFilterChange}
          placeholder="Search..."
        />
      </span>
    </div>
  );
};