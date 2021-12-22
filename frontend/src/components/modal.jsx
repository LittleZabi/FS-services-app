import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { HIDE_MODAL } from "../store/constants";
import NavLinks from "./modal-components/nav-links";
import AboutService from "./modal-components/about-service";
import GetLogout from "./modal-components/logout";
import {
  AfterUpdate,
  AfterLogin,
  AfterRegister,
  RegisterInfo,
} from "./modal-components/modal-messages";
import GetLogin from "./modal-components/login-form";
import PaymentVerfy from "./modal-components/payment-verfication";
import PaymentSucc from "./payment-succ";

function ModalView({ ModalPayload }) {
  const dispatch = useDispatch();
  return (
    <div className="blue-modal fading">
      <div className="inner-modal">
        <div className="modal-title-bar">
          <span
            onClick={() => {
              let modal = document.querySelector(".blue-modal");
              modal.classList.add("modal-close");
              setTimeout(() => {
                dispatch({ type: HIDE_MODAL });
              }, 300);
            }}
            className="button"
          >
            <FaTimes />
          </span>
        </div>
        {ModalPayload.payload.ModalType === "NavBar" ? (
          <NavLinks />
        ) : ModalPayload.payload.ModalType === "RFMInfo" ? (
          <RegisterInfo />
        ) : ModalPayload.payload.ModalType === "SRVC_MODAL" ? (
          <AboutService />
        ) : ModalPayload.payload.ModalType === "succ-reg" ? (
          <AfterRegister />
        ) : ModalPayload.payload.ModalType === "loggedSuccess" ? (
          <AfterLogin />
        ) : ModalPayload.payload.ModalType === "succ-update" ? (
          <AfterUpdate />
        ) : ModalPayload.payload.ModalType === "payment-verfy" ? (
          <PaymentVerfy />
        ) : ModalPayload.payload.ModalType === "payment-req-success" ? (
          <PaymentSucc />
        ) : ModalPayload.payload.ModalType === "get-logout" ? (
          <GetLogin />
        ) : ModalPayload.payload.ModalType === "get-logout" ? (
          <GetLogout />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ModalView;
