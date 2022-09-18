import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <div className="w-100">
        <div className="text-center">
          <h3 className="text-shadow fs-1 font-logo">Admins</h3>
          <p className="medium">Admin from each books in this store</p>
          <hr className="border border-dark border-1 opacity-25" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
