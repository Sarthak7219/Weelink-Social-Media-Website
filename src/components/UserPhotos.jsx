import React, { useState, useEffect } from "react";
import { getPhotos } from "../api/endpoints";

const UserPhotos = ({ username }) => {
  const [photosList, setPhotosList] = useState([]);

  const handleGetPhotos = async () => {
    try {
      if (!username.trim()) {
        console.log("Usename not provided");
        return;
      }
      const data = await getPhotos(username);
      if (data.success) {
        setPhotosList(data.images);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    handleGetPhotos();
  }, [username]);

  return (
    <div className="d-grid d-grid-template-2col">
      {photosList.length > 0 ? (
        photosList.map((photo, index) => (
          <div key={index}>
            <div className="user-images position-relative overflow-hidden">
              <img
                src={photo}
                className="img-fluid rounded"
                alt="User uploaded"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No photos</p>
      )}
    </div>
  );
};

export default UserPhotos;
