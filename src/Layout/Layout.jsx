import React from "react";
import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer/Footer";

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Layout;
