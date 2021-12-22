import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import InlineMessage from "../../components/inilne-message";
import Loading from "../../components/loading";
import { useDispatch } from "react-redux";
import { currencyExchangeAction, ShowModalAction } from "../../store/actions";
import { useEffect } from "react";

export default function Login() {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_log, setUserLog] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const dispatch = useDispatch();
  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setAlert({
        type: "alert",
        message: "user already logged. redirecting to logout!",
      });
      setTimeout(() => {
        setUserFound(true);
      }, 2000);
    }
  };
  const SendStuff = async (email, password) => {
    setLoading(true);
    try {
      await axios
        .post("/api/login", { auth: { email, password } })
        .then((res) => {
          setLoading(false);
          const condition = res.data.condition;
          if (condition === "emailNotFound") {
            setAlert({
              type: "alert",
              message: "Email not found please Register first!",
            });
          } else if (condition === "IncorrectPass") {
            setAlert({
              type: "alert",
              message: "incorrect password!",
            });
          } else if (condition === "NotActivated") {
            setAlert({
              type: "alert",
              message:
                "Account is exist but its not activated! we send a mail to your email box check it!",
            });
          } else {
            setAlert({
              type: "success",
              message: "Successfully logged!",
            });
            localStorage.setItem("user", JSON.stringify(res.data[0]));

            dispatch(currencyExchangeAction());
            dispatch(ShowModalAction("loggedSuccess"));
            setUserLog(true);
          }
        });
    } catch (err) {
      setAlert({
        type: "alert",
        message: "Error occured during process! please try again.",
      });
      setLoading(false);
    }
  };
  const handleForm = (event) => {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    if (email.length > 0 && password.length > 0) {
      SendStuff(email, password);
    } else {
      setAlert({ type: "alert", message: "Fill the form first!" });
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      {userFound && <Navigate to="/logout" replace={true} />}
      {user_log && <Navigate to="/" replace={true} />}

      <div className="page-view fading">
        <div className="hot-links">
          <Link to="/">
            <FaHome />
          </Link>{" "}
          <span>Login</span>
        </div>
      </div>
      <div className="blue-reg-form fading">
        <div className="main-form ">
          <div className="blue-reg-form fading">
            <h2 className="form-width">Login</h2>
            <form onSubmit={handleForm} className="form-width fading">
              <h3>Login to your account</h3>
              <p className="form-head-links">
                I am not registered yet! first
                <Link to="/register">
                  <span style={{ color: "#ff1e5e", fontWeight: "bold" }}>
                    {" "}
                    Register Me
                  </span>
                  .
                </Link>
              </p>
              <div className="flex-box">
                <div>
                  <label className="field field_v2">
                    <input
                      className="field__input"
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email address..."
                    />
                    <span className="field__label-wrap">
                      <span className="field__label">Enter your Email</span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="field field_v2">
                    <input
                      className="field__input"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password..."
                    />
                    <span className="field__label-wrap">
                      <span className="field__label">Enter your password.</span>
                    </span>
                  </label>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <br />

                {alert && (
                  <InlineMessage type={alert.type} message={alert.message} />
                )}
              </div>
              <br />
              {alert && (
                <InlineMessage type={alert.type} message={alert.message} />
              )}
              {loading && <Loading />}
              {!loading && (
                <div className="btns-sec">
                  <button
                    type="submit"
                    style={{ margin: "auto", width: 220 }}
                    className="ok__btn"
                  >
                    Login
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
