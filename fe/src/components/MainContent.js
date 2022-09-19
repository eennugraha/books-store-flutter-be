import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin, DetailAdmin, ListAdmins, ActionAdmin } from "../pages";

const MainContent = () => {
  return (
    <div className="container">
      <Routes>
        <Route activeClassName="active" path="admins" element={<Admin />}>
          <Route path="" element={<ListAdmins />}></Route>
          <Route path="register" element={<ActionAdmin />}></Route>
          <Route path="">
            <Route path=":id" element={<ActionAdmin />}></Route>
          </Route>
          <Route path="account">
            <Route path=":id" element={<DetailAdmin />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default MainContent;
