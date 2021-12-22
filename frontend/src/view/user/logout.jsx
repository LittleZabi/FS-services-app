import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const [userFound, setUserFound] = useState(true);
  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserFound(true);
    }
  };
  const handleLogout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
      setTimeout(() => {
        setUserFound(false);
      }, 1000);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      {!userFound && <Navigate to="/login" replace={true} />}

      <div className="page-view fading">
        <div className="hot-links">
          <Link to="/">
            <FaHome />
          </Link>{" "}
          <span>Logout</span>
        </div>
      </div>
      <div className="blue-reg-form fading">
        <div className="main-form ">
          <div className="blue-reg-form fading">
            <h2 className="form-width">Logout</h2>
            <h3>Logout from your account</h3>
            <p className="form-head-links">
              after logout you can not be able to purchase any product! <br />
              if you have any problem please{" "}
              <Link to="/register">
                <span style={{ color: "#ff1e5e", fontWeight: "bold" }}>
                  contact
                </span>
              </Link>{" "}
              with us.
            </p>

            <div className="btns-sec">
              <button
                type="button"
                onClick={handleLogout}
                style={{ margin: "auto", width: 220 }}
                className="ok__btn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
