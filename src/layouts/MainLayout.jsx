import React, { useEffect } from "react";
import Base from "../Base";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userData } = useAuth();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  if (!userData) {
    return null;
  }
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
