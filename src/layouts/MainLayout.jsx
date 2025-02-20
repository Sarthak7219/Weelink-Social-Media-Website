import React from "react";
import Base from "../Base"; // Import navbar or sidebar

const MainLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Base />
      <div id="content-page" className="content-page">
        <div
          className="container"
          style={{ marginBottom: "40px" }}
          id="main-content"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
