import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ShowModalAction } from "../../store/actions";
import { HIDE_MODAL } from "../../store/constants";
import InlineMessage from "../inilne-message";
import Loading from "../loading";

const PaymentVerfy = () => {
  const { payload } = useSelector((state) => state.TopReducer);
  const dispatch = useDispatch();
  const user = payload.data.user_detail;
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const payment = payload.data.payment_detail;
  const [navigate, setNavigate] = useState(false);
  const handleRequest = () => {
    const request = {
      slug: user.slug,
      amount: payment.amount,
      crncy: payment.currency,
      email: user.email,
      phone: user.phone,
      method: "direct",
    };
    try {
      setLoading(true);

      setAlert({
        type: "success",
        message: "Placing your order please wait!",
      });
      axios.post("/api/place-payment-request/", request).then((res) => {
        console.log("request: ;", res.data);
        const response = res.data.condition;
        setLoading(false);
        if (response === "DataNotEnough") {
          setAlert({
            type: "alert",
            message: "User Data not enough for this request! try again",
          });
        } else if (response === "success") {
          setAlert({
            type: "success",
            message:
              "Your Request successfully send! Redirecting to client area...",
          });
          setTimeout(() => {
            setNavigate(true);
            dispatch(ShowModalAction("payment-req-success"));
          }, 2000);
        }
      });
    } catch (error) {
      setLoading(false);
      setAlert({
        type: "error",
        message: "Errror: " + error.message,
      });
    }
  };
  return (
    <div className="payment-show">
      {navigate && <Navigate to="/client" replace={true} />}
      <h3 className="heading">Payment Request</h3>
      Hi' {user.firstname + " " + user.lastname} your request to add credits of{" "}
      <strong>
        {payment.amount}
        {payment.currency}
      </strong>{" "}
      in your account. you are agree with this request after clicking Yes the
      request will be send. we further contact with you for purchasing the
      amount.
      <br />
      <br />
      Email is using for this request: <strong>{user.email}</strong>.
      <br />
      Phone number is using for this request: <strong>{user.phone}</strong>.
      <div className="btns-sec">
        {loading && (
          <>
            <div style={{ margin: 10 }}>
              <Loading />
            </div>
          </>
        )}
        {alert && (
          <>
            <InlineMessage type={alert.type} message={alert.message} />
          </>
        )}
        {!alert && !loading && (
          <>
            <button onClick={handleRequest} className="ok__btn">
              Yes
            </button>
            <button
              onClick={() => {
                let modal = document.querySelector(".blue-modal");
                modal.classList.add("modal-close");
                setTimeout(() => {
                  dispatch({ type: HIDE_MODAL });
                }, 300);
              }}
              className="no__btn"
            >
              No
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default PaymentVerfy;
