import React from "react";
import { logout } from "../login/actions";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <>
      <nav className="flex justify-between p-4">
        <Link
          href="/dashboard"
          className="no-underline text-black"
        >
          <div>PSN-FE-Test</div>
        </Link>
        <button className="underline cursor-pointer hover:text-red-700" onClick={logout}>Logout</button>
      </nav>
    </>
  );
}
