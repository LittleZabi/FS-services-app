import { FaHome } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import SideView from "./side-view";
import MainView from "./main-view";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MessageAction } from "../../store/actions";
import axios from "axios";

const ClientArea = ({ currency }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [userState, setUserState] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    let user_ = localStorage.getItem("user");
    if (user_) {
      setLoading(true);
      setUserState(false);
      user_ = JSON.parse(user_);
      const slug = user_.slug;
      try {
        await axios.get("/api/user/" + slug).then((res) => {
          const user_res = res.data;
          if (user_res.length > 0) {
            setLoading(false);
            setUser(user_res);
          } else {
            setLoading(false);
            setUserState(true);
          }
        });
      } catch (error) {
        setLoading(false);
        setUserState(true);
      }
    } else {
      setUserState(true);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="page-view fading ">
      {userState &&
        dispatch(
          MessageAction(
            "alert",
            "Please login than you can check client area, your profile, overview, and settings."
          )
        )}
      {userState && <Navigate to="/login" replace={false} />}
      <div className="fading">
        <div className="hot-links mt-70">
          <Link to="/">
            <FaHome />
          </Link>
          <span>Client Area</span>
        </div>
      </div>
      <div className="page-view fading">
        <div className="client-view">
          <SideView data={user} loading={loading} currency={currency} />
          <MainView data={user} loading={loading} currency={currency} />
        </div>
      </div>
    </div>
  );
};
export default ClientArea;
