import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin, DetailAdmin, ListAdmins, AddAdmin } from "../pages";

const MainContent = () => {
  return (
    <div className="container">
      <Routes>
        <Route activeClassName="active" path="admins" element={<Admin />}>
          <Route path="" element={<ListAdmins />}></Route>
          <Route path="register" element={<AddAdmin />}></Route>
          {/* <Route path="edit">
            <Route path=":id" element={<EditPublisher />}></Route>
          </Route> */}
          <Route path="account">
            <Route path=":id" element={<DetailAdmin />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default MainContent;
