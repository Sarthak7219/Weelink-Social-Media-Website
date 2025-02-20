import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import defaultProfileImage from "/static/images/default_profile.jpeg";
import { useAuth } from "./contexts/useAuth";
import { SERVER_URL } from "./constants/constants";

const Base = () => {
  const { userData } = useAuth();

  let profileImageURL = defaultProfileImage;
  if (userData && userData.profile_image != null) {
    profileImageURL = `${SERVER_URL}${userData.profile_image}`;
  }
  return (
    <>
      <LeftSidebar username={userData.username} />
      <Navbar username={userData.username} profileImageURL={profileImageURL} />
      <RightSidebar />
    </>
  );
};

export default Base;
