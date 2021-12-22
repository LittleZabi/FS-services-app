import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HIDE_MODAL } from "../../store/constants";

export const RegisterInfo = () => {
  return (
    <div className="reg-info-modal">
      <h2>Get started</h2>
      <span>
        first register your self and set all your information like email,
        username, password, than set your Address like town, postal, country,
        Phone number, etc. first read our
        <Link to="/terms"> terms</Link>, and{" "}
        <Link to="/privacy-policy">privacy policy</Link>. set all information
        carefully. if you need any help just{" "}
        <Link to="/contact">contact with us</Link>. Thanks
      </span>
    </div>
  );
};
export const AfterUpdate = () => {
  return (
    <div className="after-reg-modal">
      <i className="fa fa-check"></i>
      <h3>Updated Successfully</h3>
      <h3>
        Your profile Successfully updated! Now you can use your new settings.
      </h3>
    </div>
  );
};
export const AfterLogin = () => {
  return (
    <div className="after-reg-modal">
      <i className="fa fa-check"></i>
      <h3>Login Successfully</h3>
      <h3>
        You are successfully logged with us now you can place your orders! and
        manage your stuff.
      </h3>
    </div>
  );
};
export const AfterRegister = () => {
  const dispatch = useDispatch();
  return (
    <div className="after-reg-modal">
      <i className="fa fa-check"></i>
      <h3>Form Successfully submited</h3>
      <h3>
        we send a mail on your account just open your email and click on
        activation button to activate!
        <br />
        <span style={{ fontSize: 14 }}>
          in case if you don't recive any email in 24-hours then go to Login
          page and enter your email and password we resend email to your
          account!
        </span>
        <div className="btns-sec">
          <button
            onClick={() => {
              let modal = document.querySelector(".blue-modal");
              modal.classList.add("modal-close");
              setTimeout(() => {
                dispatch({ type: HIDE_MODAL });
              }, 300);
            }}
            className="ok__btn"
            style={{ width: 210, margin: "10px auto 0 auto" }}
          >
            Close window
          </button>
        </div>
      </h3>
    </div>
  );
};
