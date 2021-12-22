import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShowModalAction } from "../../store/actions";
import InlineMessage from "../inilne-message";
import Loading from "../loading";

const GetLogin = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_log, setUserLog] = useState(false);
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
  return (
    <div className="blue-reg-form fading client-login-form">
      <h2 className="form-width">Login</h2>
      <form className="form-width fading" onSubmit={handleForm}>
        <h3>Just Login your account!</h3>
        <p className="form-head-links">
          I am not registered yet!
          <Link to="/register"> first register me.</Link>
        </p>
        <div className="flex-box">
          <div>
            <label htmlFor="mobile">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email address"
            />
            <label htmlFor="mobile">Enter Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password..."
            />
          </div>
        </div>
        <br />
        {alert && <InlineMessage type={alert.type} message={alert.message} />}
        {loading && <Loading />}
        {!loading && (
          <input
            type="submit"
            id="submit"
            className="form-width form-submit"
            value="Login"
          />
        )}
      </form>
    </div>
  );
};
export default GetLogin;
