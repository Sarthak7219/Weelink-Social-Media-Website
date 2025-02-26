import React from "react";
import { Link } from "react-router-dom";

const LeftSidebar = ({ username, handleMessageBoxOpen }) => {
  return (
    <div className="iq-sidebar  sidebar-default ">
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            <li className="active">
              <Link to="/" className=" ">
                <i className="las la-newspaper"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className="">
              <Link to={`/profile/${username}/`} className=" ">
                <i className="las la-user"></i>
                <span>Profile</span>
              </Link>
            </li>

            <li className=" ">
              <Link to="#" className=" " onClick={handleMessageBoxOpen}>
                <i className="ri-mail-line"></i>
                <span>Messages</span>
                <i className="ri-arrow-right-s-line iq-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-5"></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
