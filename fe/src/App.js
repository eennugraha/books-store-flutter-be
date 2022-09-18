import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Navbar, MainContent } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <MainContent />
    </div>
  );
};

export default App;
