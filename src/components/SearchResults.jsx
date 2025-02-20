import React from "react";
import { SERVER_URL } from "../constants/constants";
import { Link } from "react-router-dom";

const SearchResults = ({ results, loading }) => {
  if (loading) {
    return (
      <div
        className="no-before d-flex align-items-center  mb-2"
        style={{ cursor: "pointer", borderBottom: "1px", height: "50px" }}
      >
        Loading...
      </div>
    );
  }

  if (!results.length) {
    return (
      <div
        className="no-before d-flex align-items-center  mb-2"
        style={{ cursor: "pointer", borderBottom: "1px", height: "50px" }}
      >
        No results found!
      </div>
    );
  }
  return (
    <>
      {results.length > 0 &&
        results.map((user) => (
          <Link to={`/profile/${user.username}`}>
            <div
              className="no-before d-flex align-items-center  mb-2"
              style={{ cursor: "pointer", borderBottom: "1px", height: "50px" }}
            >
              <div className="iq-profile-avatar">
                <img
                  className="rounded-circle avatar-50"
                  src={
                    user.profile_image
                      ? `${SERVER_URL}${user.profile_image}`
                      : "/static/images/default_profile.jpeg"
                  }
                  alt="profile-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="ms-3 d-flex-column flex align-items-center">
                <h6 className="mb-0">
                  {user.first_name} {user.last_name}
                </h6>
                <h6 className="mb-0" style={{ color: "#777d74" }}>
                  @{user.username}
                </h6>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default SearchResults;
