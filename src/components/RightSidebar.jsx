import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../constants/constants";
import { getDisplayThreads } from "../api/endpoints";
import defaultImg from "/static/images/default_profile.jpeg";

const RightSidebar = () => {
  const [threadList, setThreadList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getThreads = async () => {
    setLoading(true);
    try {
      const data = await getDisplayThreads();
      setThreadList(data);
    } catch {
      console.log("Failed to get conversations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <div className="right-sidebar-mini right-sidebar">
      <div className="right-sidebar-panel p-0">
        <h4 style={{ padding: "0.938rem 1.25rem" }}>Messages</h4>
        <div className="card shadow-none">
          <div className="card-body p-0">
            <div className="media-height p-3" data-scrollbar="init">
              {threadList && threadList.length > 0 ? (
                threadList.map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/chat/${thread.other_user}/`}
                    className="active contact-li"
                  >
                    <div className="d-flex align-items-center mb-4">
                      <div className="iq-profile-avatar status-online">
                        <img
                          className="rounded-circle avatar-50"
                          src={
                            thread.other_user_img
                              ? `${SERVER_URL}${thread.other_user_img}`
                              : defaultImg
                          }
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0">{thread.other_user}</h6>
                        <p className="mb-0">{thread.most_recent_message}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No messages</p>
              )}
            </div>
            <div className="right-sidebar-toggle bg-primary text-white mt-3">
              <i className="ri-arrow-left-line side-left-icon"></i>
              <i className="ri-arrow-right-line side-right-icon">
                <span className="ms-3 d-inline-block">Close Menu</span>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
