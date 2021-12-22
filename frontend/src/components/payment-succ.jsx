import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HIDE_MODAL } from "../store/constants";

const PaymentSucc = () => {
  const dispatch = useDispatch();
  return (
    <div className="payment-show">
      <h3 className="heading" style={{ color: "#046bcf" }}>
        Payment Request successfully Done!
      </h3>
      <strong style={{ color: "#046bcf" }}>
        The admin must be contact withen 24-hours please stay tuned!
        <br />
        <br />
      </strong>
      if you want some help please{" "}
      <Link to="/contact">
        <strong>contact with us!</strong>
      </Link>{" "}
      <div className="btns-sec">
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
          Close
        </button>
      </div>
    </div>
  );
};
export default PaymentSucc;
