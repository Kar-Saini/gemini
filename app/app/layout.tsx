import React, { ReactNode } from "react";
import SideBar from "../_components/SideBar";
import Appbar from "../_components/Appbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex flex-col w-full">
        <Appbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
