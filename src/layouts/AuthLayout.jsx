import React from "react";
import { useAuth } from "../contexts/useAuth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "../api/endpoints";

const AuthLayout = ({ children }) => {
  // if (localStorage.getItem("userData") || sessionStorage.getItem("userData")) {
  //   return <Navigate to="/" />;
  // }
  const navigate = useNavigate();
  const { google_login } = useAuth();
  const handleGoogleLogin = async (response) => {
    try {
      const res = await api.post(
        "/auth/google/",
        { access_token: response.credential },
        { withCredentials: true }
      );
      if (res.data.set_username) {
        navigate("/set-username", { state: { email: res.data.email } });
      } else {
        google_login(res.data, navigate);
        return;
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message);
      return;
    }
  };

  return (
    <div className="wrapper">
      {" "}
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <div className="container p-0">
          <div className="row no-gutters">
            <div className="col-md-6 text-center pt-5">
              <div className="sign-in-detail text-white">
                <a
                  className="sign-in-logo mb-5"
                  href="#"
                  style={{ color: "white", fontSize: "35px" }}
                >
                  Weelink
                </a>
                <div className="sign-slider overflow-hidden ">
                  <ul className="swiper-wrapper list-inline m-0 p-0 ">
                    <li className="swiper-slide">
                      <img
                        src="/static/images/1.png"
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5"
              style={{ minHeight: "100vh" }}
            >
              {React.cloneElement(children, { handleGoogleLogin })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
