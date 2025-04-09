import React from "react";
import { logout } from "../login/actions";

export default function NavigationBar() {
  return (
    <>
      <nav className="flex justify-between p-4">
        <div>PSN-FE-Test</div>
        <button onClick={logout}>Logout</button>
      </nav>
    </>
  );
}
