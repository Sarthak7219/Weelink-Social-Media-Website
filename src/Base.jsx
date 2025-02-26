import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import defaultProfileImage from "/static/images/default_profile.jpeg";
import { useAuth } from "./contexts/useAuth";

const Base = () => {
  const { userData } = useAuth();
  const [messageBoxOpen, setMessageBoxOpen] = useState(true);
  const handleMessageBoxOpen = () => {
    setMessageBoxOpen((prev) => !prev);
    console.log(messageBoxOpen);
  };
  let profileImageURL = defaultProfileImage;
  if (userData && userData.profile_image != null) {
    profileImageURL = userData.profile_image;
  }
  return (
    <>
      <LeftSidebar
        username={userData.username}
        handleMessageBoxOpen={handleMessageBoxOpen}
      />
      <Navbar
        username={userData.username}
        profileImageURL={profileImageURL}
        handleMessageBoxOpen={handleMessageBoxOpen}
      />
      <RightSidebar messageBoxOpen={messageBoxOpen} />
    </>
  );
};

export default Base;
