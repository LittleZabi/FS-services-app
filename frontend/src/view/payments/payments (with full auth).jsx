import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import InlineMessage from "../../components/inilne-message";
import Loading from "../../components/loading";
import {
  DataFireToModalAction,
  MessageAction,
  ShowModalAction,
} from "../../store/actions";

export default function PaymentsRequest() {
  const [user, setUser] = useState([{ email: "", currency: "", slug: "" }]);
  const [userState, setUserState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [crnc_rate, setCrncRate] = useState(1);
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const getCrncRate = async (crnc) => {
    const convert = "PKR_" + crnc;
    await axios
      .get(
        `https://free.currconv.com/api/v7/convert?q=${convert}&compact=ultra&apiKey=fd0f4dc25bac27167fb8`
      )
      .then((res) => {
        if (res.data[convert]) {
          const value = res.data[convert];
          setCrncRate(value);
        } else {
          setCrncRate(1);
        }
      });
  };
  const getUser = async () => {
    let user_ = localStorage.getItem("user");
    if (user_) {
      setLoading(true);
      setUserState(false);
      user_ = JSON.parse(user_);
      const slug = user_.slug;
      await axios.get("/api/user/" + slug).then((res) => {
        const user_res = res.data;
        if (user_res.length > 0) {
          setLoading(false);
          setUser(user_res);
          getCrncRate(user_res[0].currency);
        } else {
          setLoading(false);
          setUserState(true);
        }
      });
    } else {
      setUserState(true);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const amount = e.target["amount"].value;
    const currency = e.target["currency"].value;
    const slug = e.target["user-slug"].value;
    if (email.length > 2) {
      if (password.length > 2) {
        if (amount.length > 0) {
          if (slug.length > 0) {
            setLoading(true);
            setAlert({
              type: "success",
              message: "Wait while we verify the user...",
            });

            try {
              const user_data = { email, password, currency, slug, amount };
              axios.post("/api/user-verification/", user_data).then((res) => {
                setLoading(false);
                if (res.data.length > 0) {
                  setAlert({
                    type: "success",
                    message: "user verified successfully!",
                  });
                  dispatch(
                    DataFireToModalAction("payment-verfy", {
                      payment_detail: user_data,
                      user_detail: res.data[0],
                    })
                  );
                } else {
                  setAlert({
                    type: "alert",
                    message: "user email or password is incorrect!",
                  });
                }
              });
            } catch (err) {
              setLoading(false);
              setAlert({
                type: "alert",
                message: "Error occured: " + err.message,
              });
            }
          } else {
            setAlert({
              type: "alert",
              message: "User details is not enough! user key is missing.",
            });
          }
        } else {
          setAlert({ type: "alert", message: "Enter your Amount" });
        }
      } else {
        setAlert({ type: "alert", message: "Enter your password" });
      }
    } else {
      setAlert({ type: "alert", message: "Enter your email address" });
    }
  };
  return (
    <div className="page-view fading ">
      {userState &&
        dispatch(
          MessageAction(
            "alert",
            "Please login then you can send payment request."
          )
        )}
      {userState && <Navigate to="/login" replace={false} />}
      <div className="fading">
        <div className="hot-links mt-70">
          <Link to="/">
            <FaHome />
          </Link>
          <span>Payments Request</span>
        </div>
      </div>
      <div className="page-view fading ">
        <div className="services-show">
          <div
            className="blue-reg-form"
            style={{ boxShadow: "none", padding: 0, margin: 0 }}
          >
            <div className="inner-form">
              <h3>Authenticate your self than request for payment!</h3>
              <form onSubmit={handleForm}>
                {alert && (
                  <InlineMessage type={alert.type} message={alert.message} />
                )}
                <input type="hidden" name="currency" value={user[0].currency} />
                <input type="hidden" name="user-slug" value={user[0].slug} />
                <label className="field field_v2">
                  <input
                    className="field__input"
                    defaultValue={user[0].email}
                    placeholder="email address..."
                    disabled
                    id="email"
                  />
                  <span className="field__label-wrap"></span>
                </label>
                <label className="field field_v2">
                  <input
                    className="field__input"
                    type="password"
                    placeholder="Enter your password!"
                    id="password"
                  />
                  <span className="field__label-wrap">
                    <span className="field__label">Enter your Password</span>
                  </span>
                </label>
                <label className="field field_v2 number-input">
                  <input
                    className="field__input"
                    type="number"
                    placeholder="Enter Amount"
                    min="0"
                    id="amount"
                  />
                  <span className="crncy-type">
                    {user[0].currency === "USD" ? (
                      <i className="fa fa-dollar"></i>
                    ) : (
                      user[0].currency
                    )}
                  </span>
                  <span className="field__label-wrap">
                    <span className="field__label">Enter your Amount</span>
                  </span>
                </label>
                {loading && (
                  <>
                    <br />
                    <br />
                    <Loading />
                  </>
                )}
                {!loading && (
                  <input className="field__input submit-input" type="submit" />
                )}
              </form>
            </div>

            <br />
            {/* <label className="field field_v3">
              <input className="field__input" placeholder="e.g. melnik909@ya.ru" />
              <span className="field__label-wrap">
                <span className="field__label">E-mail</span>
              </span>
            </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}
