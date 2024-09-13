import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="bg-neutral-100 h-screen w-screen flex flex-row">
      {/* Sidebar */}
      <div className="flex-shrink-0 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main content area */}
        <div className="flex-1 p-4 min-h-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
