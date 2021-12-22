import { useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShowModalAction, UserAuthAction } from "../store/actions";
function Header() {
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAuthAction());
  }, [dispatch]);
  return (
    <header className="header-class">
      <div className="x-path-back"></div>
      <nav className="fading">
        <div className="nav-view">
          <div className="nav-logo">
            <Link to="/">
              <h1>FSUnlocker</h1>
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li className="user-btn">
              <Link to={user.slug !== "" ? "/client" : "/login"}>
                <FaUser className={user.slug === "" ? "" : "user-logged"} />
              </Link>
            </li>
            <li>
              <button
                name="Menu button"
                title="Reveal Menu"
                onClick={() => dispatch(ShowModalAction("NavBar"))}
                className="nav-menu-btn"
              >
                {<FaBars />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
