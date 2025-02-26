import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  get_user_profile_data,
  toggleFollow,
  getFriends,
} from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import UserPosts from "../components/UserPosts";
import defaultImage from "/static/images/default_profile.jpeg";
import UserPhotos from "../components/UserPhotos";

const ProfilePage = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isOurProfile, setIsOurProfile] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const handleToggleFollow = async () => {
    const data = await toggleFollow(username);
    if (data.now_following) {
      setFollowerCount(followerCount + 1);
      setFollowing(true);
    } else {
      setFollowerCount(followerCount - 1);
      setFollowing(false);
    }
  };

  const handleGetFriends = async () => {
    try {
      const data = await getFriends(username);
      setFollowersList(data.followers_list);
      setFollowingList(data.following_list);
    } catch {
      console.log("Error getting data");
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_user_profile_data(username);
        setBio(data.bio);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setProfileImage(data.profile_image);
        setFollowerCount(data.follower_count);
        setFollowingCount(data.following_count);
        setIsOurProfile(data.is_our_profile);
        setFollowing(data.following);
      } catch (error) {
        console.log("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    handleGetFriends();
    fetchData();
  }, [username]);

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body profile-page p-0">
            <div className="profile-header">
              <div className="position-relative">
                <img
                  src="/static/images/profile-bg.jpg"
                  alt="profile-bg"
                  className="rounded img-fluid"
                />

                {isOurProfile && (
                  <ul
                    className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0"
                    style={{ zIndex: "100" }}
                  >
                    <li>
                      <Link to={`/profile/${username}/edit/`}>
                        <i className="ri-pencil-line"></i>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="user-detail text-center mb-3">
                <div className="profile-img">
                  <img
                    src={
                      loading
                        ? null
                        : profileImage
                        ? `${SERVER_URL}${profileImage}`
                        : defaultImage
                    }
                    alt="profile-img"
                    className="avatar-130 img-fluid"
                    style={{
                      width: "127.5px",
                      height: "127.5px",
                      maxWidth: "none",
                      objectFit: "cover",
                      margin: "auto",
                    }}
                  />
                </div>
                <div className="profile-detail">
                  <h3 className="">{username}</h3>
                </div>
              </div>
              <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                <div className="social-info">
                  <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                    <li className="text-center ps-3">
                      <h6>Posts</h6>
                      <p className="mb-0">0</p>
                    </li>
                    <li className="text-center ps-3">
                      <h6>Followers</h6>
                      <p className="mb-0">{loading ? "-" : followerCount}</p>
                    </li>
                    <li className="text-center ps-3">
                      <h6>Following</h6>
                      <p className="mb-0">{loading ? "-" : followingCount}</p>
                    </li>
                  </ul>
                </div>

                {!isOurProfile && (
                  <div className="d-flex">
                    {following && (
                      <Link
                        to={`/chat/${username}/`}
                        className="btn btn-success d-block mt-3 me-3"
                        id="message-btn"
                        data-user-id="1"
                        style={{ color: "#fff" }}
                      >
                        Message
                      </Link>
                    )}

                    {following ? (
                      <button
                        onClick={handleToggleFollow}
                        type="button"
                        name="following"
                        value="following"
                        className="btn btn-outline-primary bg-white d-block mt-3"
                        style={{ width: "94.23px !important" }}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={handleToggleFollow}
                        type="button"
                        name="follow"
                        value="follow"
                        className="btn btn-primary d-block mt-3"
                        style={{ width: "94.23px !important" }}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {following || isOurProfile ? (
          <div className="card">
            <div className="card-body p-0">
              <div className="user-tabing">
                <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                  <li className="nav-item col-12 col-sm-3 p-0">
                    <a
                      className="nav-link active"
                      href="#pills-timeline-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#timeline"
                      role="button"
                    >
                      Posts
                    </a>
                  </li>
                  <li className="nav-item col-12 col-sm-3 p-0">
                    <a
                      className="nav-link"
                      href="#pills-about-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#about"
                      role="button"
                    >
                      About
                    </a>
                  </li>
                  <li
                    className="nav-item col-12 col-sm-3 p-0"
                    onClick={handleGetFriends}
                  >
                    <a
                      className="nav-link"
                      href="#pills-friends-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#friends"
                      role="button"
                    >
                      Friends
                    </a>
                  </li>
                  <li className="nav-item col-12 col-sm-3 p-0">
                    <a
                      className="nav-link"
                      href="#pills-photos-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#photos"
                      role="button"
                    >
                      Photos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p>Follow user to view more</p>
        )}
      </div>

      {(following || isOurProfile) && (
        <div className="col-sm-12 main-content">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="timeline"
              role="tabpanel"
            >
              <div className="card-body p-0">
                <div className="row">
                  {/* Post container */}
                  <div className="col-lg-8">
                    {/* Post List*/}
                    <UserPosts
                      username={username}
                      isOurProfile={isOurProfile}
                      profileImageURL={
                        loading
                          ? null
                          : profileImage
                          ? `${SERVER_URL}${profileImage}`
                          : defaultImage
                      }
                      isHome={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="about" role="tabpanel">
              <div className="card">
                <div className="card-body">
                  <div className="row justify-content-start">
                    <div className="col-md-9 px-4" style={{ width: "100%" }}>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="v-pills-basicinfo-tab"
                          role="tabpanel"
                          aria-labelledby="v-pills-basicinfo-tab"
                        >
                          <h4>Bio</h4>
                          <hr />
                          <div
                            className="row"
                            style={{ justifyContent: "flex-start" }}
                          >
                            <div className="col-9">
                              <p className="mb-0">{loading ? "-" : bio}</p>
                            </div>
                          </div>
                          <h4 className="mt-3">Contact Information</h4>
                          <hr />
                          <div className="row ">
                            <div className="col-3">
                              <h6>Email</h6>
                            </div>
                            <div className="col-9">
                              <p className="mb-0">{email}</p>
                            </div>
                          </div>
                          <h4 className="mt-3">Basic Information</h4>
                          <hr />
                          <div className="row">
                            <div className="col-3">
                              <h6>First Name</h6>
                            </div>
                            <div className="col-9">
                              <p className="mb-0">{firstName}</p>
                            </div>

                            <div className="col-3">
                              <h6>Last Name</h6>
                            </div>
                            <div className="col-9">
                              <p className="mb-0">{lastName}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="friends" role="tabpanel">
              <div className="card">
                <div className="card-body">
                  <h2>Friends</h2>
                  <div className="friend-list-tab mt-2">
                    <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                      <li>
                        <a
                          className="nav-link active"
                          data-bs-toggle="pill"
                          href="#pill-followers"
                          data-bs-target="#pill-followers"
                        >
                          Followers
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link"
                          data-bs-toggle="pill"
                          href="#pill-following"
                          data-bs-target="#pill-following"
                        >
                          Following
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {/* Followers List */}
                      <div
                        id="pill-followers"
                        className="list-group tab-pane fade show active"
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                      >
                        {/* Friends list */}
                        {followersList.length > 0 ? (
                          followersList.map((user, index) => (
                            <a key={index} href={`/profile/${user.username}`}>
                              <div
                                className="no-before d-flex align-items-center  py-2"
                                style={{
                                  cursor: "pointer",
                                  borderBottom: "1px solid #e4e4e4",
                                  height: " 70px",
                                }}
                              >
                                <div className="iq-profile-avatar">
                                  <img
                                    className="rounded-circle avatar-50"
                                    alt="profile-img"
                                    src={
                                      user.user_image
                                        ? `${SERVER_URL}${user.user_image}`
                                        : defaultImage
                                    }
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                                <div className="ms-3 d-flex-column flex align-items-center">
                                  <h6 className="mb-0">
                                    {user.first_name} {user.last_name}
                                  </h6>
                                  <h6
                                    className="mb-0"
                                    style={{ color: "rgb(119, 125, 116)" }}
                                  >
                                    @{user.username}
                                  </h6>
                                </div>
                              </div>
                            </a>
                          ))
                        ) : (
                          <p>No followers</p>
                        )}
                      </div>

                      {/* Following List */}
                      <div
                        id="pill-following"
                        className="list-group tab-pane fade"
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                      >
                        {followingList.length > 0 ? (
                          followingList.map((user, index) => (
                            <Link to={`/profile/${user.username}`}>
                              <div
                                className="no-before d-flex align-items-center  py-2"
                                style={{
                                  cursor: "pointer",
                                  borderBottom: "1px solid #e4e4e4",
                                  height: " 70px",
                                }}
                              >
                                <div className="iq-profile-avatar">
                                  <img
                                    className="rounded-circle avatar-50"
                                    alt="profile-img"
                                    src={
                                      user.user_image
                                        ? `${SERVER_URL}${user.user_image}`
                                        : defaultImage
                                    }
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                                <div className="ms-3 d-flex-column flex align-items-center">
                                  <h6 className="mb-0">
                                    {user.first_name} {user.last_name}
                                  </h6>
                                  <h6
                                    className="mb-0"
                                    style={{ color: "rgb(119, 125, 116)" }}
                                  >
                                    @{user.username}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p>No following</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="photos" role="tabpanel">
              <div className="card">
                <div className="card-body">
                  <h2>Photos</h2>
                  <div className="friend-list-tab mt-2">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="photosofyou"
                        role="tabpanel"
                      >
                        <div className="card-body p-0">
                          <UserPhotos username={username} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
