import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShowModalAction } from "../../store/actions";
import { HIDE_MODAL } from "../../store/constants";

const NavLinks = () => {
  const [userState, setUserState] = useState(false);
  const getUser = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUserState(user);
    } else {
      setUserState(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const closeModal = () => {
    let modal = document.querySelector(".blue-modal");
    modal.classList.add("modal-close");
    setTimeout(() => {
      dispatch({ type: HIDE_MODAL });
    }, 300);
  };
  const dispatch = useDispatch();
  return (
    <div className="items">
      <ul>
        <span className="title">Menu</span>
        <li>
          <Link to="/" onClick={closeModal}>
            Home
          </Link>
        </li>
        {!userState && (
          <li>
            <Link onClick={closeModal} to="/register">
              Get Started
            </Link>
          </li>
        )}
        {userState && (
          <li>
            <Link onClick={closeModal} to="/client">
              Client Area
            </Link>
          </li>
        )}

        <li>
          <Link onClick={closeModal} to="/services">
            Services
          </Link>
        </li>
      </ul>

      <ul>
        <span className="title">User</span>
        {!userState && (
          <li>
            <Link onClick={closeModal} to="/login">
              Login
            </Link>
          </li>
        )}
        {userState && (
          <>
            <li>
              <Link onClick={closeModal} to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link onClick={closeModal} to="/logout">
                Logout
              </Link>
            </li>
          </>
        )}
        <li>
          <Link onClick={closeModal} to="/contact">
            Contact
          </Link>
        </li>
        <li>
          <Link onClick={closeModal} to="/about">
            About
          </Link>
        </li>
      </ul>
      <ul>
        <span className="title">Others</span>
        <li>
          <Link onClick={closeModal} to="/privacy">
            Privcy Policy
          </Link>
        </li>
        <li>
          <Link onClick={closeModal} to="/terms">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link onClick={closeModal} to="/help">
            help
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
