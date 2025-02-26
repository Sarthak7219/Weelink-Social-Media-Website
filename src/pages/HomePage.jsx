import React from "react";
import UserPosts from "../components/UserPosts";
import defaultProfileImage from "/static/images/default_profile.jpeg";
import { useAuth } from "../contexts/useAuth";

const HomePage = () => {
  const { userData } = useAuth();
  let profileImageURL = defaultProfileImage;
  if (userData.profile_image != null) {
    profileImageURL = userData.profile_image;
  }
  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <div className="col-lg-8 row m-0 p-0 main-content">
        <UserPosts
          username=""
          isOurProfile={true}
          profileImageURL={profileImageURL}
          isHome={true}
        />
      </div>
    </div>
  );
};

export default HomePage;
