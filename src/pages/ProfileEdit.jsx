import React, { useState } from "react";
import { update_user } from "../api/endpoints";
import { useAuth } from "../contexts/useAuth";
import { SERVER_URL } from "../constants/constants";

const ProfileEdit = () => {
  const { userData, setUserData } = useAuth();
  // const storage = JSON.parse(localStorage.getItem("userData"));
  const [username, setUsername] = useState(userData ? userData.username : "");
  const [bio, setBio] = useState(userData ? userData.bio : "");
  const [email, setEmail] = useState(userData ? userData.email : "");
  const [firstName, setFirstName] = useState(
    userData ? userData.first_name : ""
  );
  const [lastName, setLastName] = useState(userData ? userData.last_name : "");
  const [profileImage, setProfileImage] = useState(
    userData ? userData.profile_image : null
  );
  const [previewImageURL, setPreviewImageURL] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImageURL(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        username: username,
        bio: bio,
        email: email,
        first_name: firstName,
        last_name: lastName,
      };
      if (previewImageURL !== null) {
        //User has uploaded a file
        payload.profile_image = profileImage;
      }
      const data = await update_user(payload);
      setProfileImage(data.profile_image);
      setPreviewImageURL(null);

      const updatedUserData = {
        username: data.username,
        bio: data.bio,
        email: data.email,
        profile_image: data.profile_image,
        first_name: data.first_name,
        last_name: data.last_name,
      };

      setUserData(updatedUserData);
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      alert("Details updated successfully! ");
    } catch {
      alert("Error updating details");
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="iq-edit-list-data">
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="personal-information"
              role="tabpanel"
            >
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Personal Information</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group row align-items-center">
                    <div className="col-md-12">
                      <input
                        id="profile-pic-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                      <label
                        className="profile-img-edit"
                        htmlFor="profile-pic-input"
                      >
                        <img
                          className="profile-pic"
                          src={
                            previewImageURL
                              ? previewImageURL
                              : profileImage
                              ? `${SERVER_URL}${profileImage}`
                              : null
                          }
                          alt="profile-pic"
                          style={{
                            objectFit: "cover",
                            height: "150px",
                            width: "150px",
                          }}
                        />
                        <div className="p-image">
                          <i className="ri-pencil-line upload-button text-white"></i>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className=" row align-items-center">
                    <div className="form-group col-sm-6">
                      <label htmlFor="first_name" className="form-label">
                        First Name :
                      </label>
                      <input
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        type="text"
                        name="first_name"
                        value={firstName}
                        className="form-control"
                        maxLength="100"
                        required=""
                        id="id_first_name"
                      ></input>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="last_name" className="form-label">
                        Last Name :
                      </label>
                      <input
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        type="text"
                        name="last_name"
                        value={lastName}
                        className="form-control"
                        maxLength="100"
                        required=""
                        id="id_last_name"
                      ></input>
                    </div>

                    <div className="form-group col-sm-6">
                      <label htmlFor="username" className="form-label">
                        Username :
                      </label>
                      <input
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        type="text"
                        name="username"
                        value={username}
                        className="form-control"
                        maxLength="100"
                        required=""
                        id="id_username"
                      ></input>
                    </div>

                    <div className="form-group col-sm-6">
                      <label className="form-label" htmlFor="email">
                        Email :
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        name="email"
                        value={email}
                        className="form-control"
                        required=""
                        id="id_email"
                      ></input>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="bio" className="form-label">
                        Bio :
                      </label>
                      <textarea
                        onChange={(e) => {
                          setBio(e.target.value);
                        }}
                        value={bio}
                        name="bio"
                        cols="40"
                        rows="3"
                        className="form-control"
                        maxLength="150"
                        required=""
                        id="id_bio"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={handleUpdate}
                    type="buttom"
                    className="btn btn-primary me-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
