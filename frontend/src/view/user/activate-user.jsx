import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";

const ActivateUser = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  let token = useParams();
  token = token.token;
  const getActivate = async (token) => {
    try {
      setLoading(true);
      await axios.post("/api/activate-user/", { token }).then((res) => {
        const condition = res.data.condition;
        if (condition === "success") {
          setMessage({ type: "success" });
        }
        if (condition === "userNotExist") {
          setMessage({ type: "userNotExist" });
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setMessage({
        type: "alert",
        message: "Error occured during activating user!",
      });
    }
  };
  useEffect(() => {
    getActivate(token);
  }, [token]);
  return (
    <div className="user-activate mt-70 fading">
      {loading && <Loading />}
      {!loading && (
        <>
          {message && message.type === "success" ? (
            <>
              <i className="fa fa-check"></i>
              <h2>Activated Successfully</h2>
              <h4>
                You are activated now! Choose your favourite order and get best
                benefits.
              </h4>
              <h2>Thanks!</h2>
            </>
          ) : (
            <>
              <i className="fa fa-times"></i>
              <h2 style={{ color: "orangered" }}>Activation Failed</h2>
              <h4>
                Activation key is not located. You used this token before OR
                Token has been expired OR user not exist.
              </h4>
              <h5>
                send your <Link to="/contact">feedback</Link> we must take a
                action further!
              </h5>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default ActivateUser;
