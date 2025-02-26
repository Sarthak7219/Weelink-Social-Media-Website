import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import { search, logout } from "../api/endpoints";

const Navbar = ({ username, profileImageURL, handleMessageBoxOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);
  const nav = useNavigate();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const users = await search(query);
      setResults(users);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      nav("/login");
    } catch {
      alert("Error logging out");
    }
  };

  useEffect(() => {
    // If the query is empty, clear results.
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setShowResults(true);

    // Debounce the API call: wait 500ms after the user stops typing.
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    // Cleanup timer if query changes
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        // Hide the search results when clicking outside

        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-navbar-logo d-flex justify-content-between">
            <Link to="/">
              <span>Weelink</span>
            </Link>
            <div className="iq-menu-bt align-self-center">
              <div className="wrapper-menu">
                <div className="main-circle">
                  <i className="ri-menu-line"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="iq-search-bar device-search" id="search-container">
            <div className="searchbox">
              <button
                className="search-link"
                type="button"
                onClick={handleSearch}
                style={{ border: "None", background: "transparent" }}
              >
                <i className="ri-search-line"></i>
              </button>
              <input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                type="text"
                className="text search-input"
                placeholder="Search profiles..."
                id="search-input"
                name="search-input"
              />
            </div>
            {/* Search */}
            {showResults && (
              <div
                ref={searchContainerRef}
                id="search-results"
                className="list-group mt-2 ps-3 pt-2"
                style={{ border: "none", width: "30rem", display: "block" }}
              >
                <SearchResults results={results} loading={loading} />
              </div>
            )}
          </div>
          <button className="navbar-toggler" type="button">
            <i className="ri-menu-3-line"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto navbar-list">
              <li>
                <Link to="/" className="  d-flex align-items-center">
                  <i className="ri-home-line"></i>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="  d-flex align-items-center"
                  onClick={handleMessageBoxOpen}
                >
                  <i className="ri-mail-line"></i>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="   d-flex align-items-center dropdown-toggle"
                  id="drop-down-arrow"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={profileImageURL}
                    className="img-fluid rounded-circle me-3"
                    alt="user"
                  />

                  <div className="caption">
                    <h6 className="mb-0 line-height">{username}</h6>
                  </div>
                </a>
                <div
                  className="sub-drop dropdown-menu caption-menu"
                  aria-labelledby="drop-down-arrow"
                >
                  <div className="card shadow-none m-0">
                    <div className="card-header  bg-primary">
                      <div className="header-title">
                        <h5 className="mb-0 text-white">Hello {username}</h5>
                      </div>
                    </div>
                    <div className="card-body p-0 ">
                      <Link
                        to={`/profile/${username}/`}
                        className="iq-sub-card iq-bg-primary-hover"
                      >
                        <div className="d-flex align-items-center">
                          <div className="rounded card-icon bg-soft-primary">
                            <i className="ri-file-user-line"></i>
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 ">My Profile</h6>
                            <p className="mb-0 font-size-12">
                              View personal profile details.
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to={`/profile/${username}/edit/`}
                        className="iq-sub-card iq-bg-warning-hover"
                      >
                        <div className="d-flex align-items-center">
                          <div className="rounded card-icon bg-soft-warning">
                            <i className="ri-profile-line"></i>
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 ">Edit Profile</h6>
                            <p className="mb-0 font-size-12">
                              Modify your personal details.
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div className="d-inline-block w-100 text-center p-3">
                        <button
                          onClick={handleLogout}
                          className="btn btn-primary iq-sign-btn"
                          type="button"
                        >
                          Sign out<i className="ri-login-box-line ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
