import axios from "axios";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import InlineMessage from "../../components/inilne-message";
import Loading from "../../components/loading";

function Contact() {
  const [Alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const send_feedback = async (values) => {
    setLoading(true);
    await axios.post("/api/feedback/", { values }).then((res) => {
      console.log(res.data);
      if (res.data.condition === "success") {
        setAlert({
          type: "success",
          message: "Successfully send. Thanks for your feedback!",
        });
      }
      setLoading(false);
    });
  };
  const handleForm = (event) => {
    event.preventDefault();
    const username = event.target["name-box"].value;
    const email = event.target["email-box"].value;
    const message = event.target["text-area"].value;
    if (email.length > 0) {
      if (username.length > 0) {
        if (message.length > 0) {
          send_feedback({ email, message, username });
        } else {
          setAlert({
            type: "alert",
            message: "Message is empty please enter your message/feedback!",
          });
        }
      } else {
        setAlert({
          type: "alert",
          message: "Enter your name.",
        });
      }
    } else {
      setAlert({
        type: "alert",
        message: "Email is empty please enter your email address!",
      });
    }
  };
  return (
    <>
      <div className="page-view fading">
        <div className="hot-links">
          <Link to="/">
            <FaHome />
          </Link>
          <span>Feedback</span>
        </div>
      </div>
      <div className="contact">
        <div className="main-form ">
          <div className="blue-reg-form fading">
            <h2 className="form-width">Contact/Feedback</h2>
            <form onSubmit={handleForm} className="form-width fading">
              <p className="form-head-links">
                Contact with us or Send your feedbacks! we must take decision on
                your message.
              </p>
              <h3>EMAIL AND MESSAGE</h3>
              <div className="flex-box">
                <div>
                  <label className="field field_v2">
                    <input
                      className="field__input"
                      type="text"
                      id="name-box"
                      placeholder="your name..."
                    />
                    <span className="field__label-wrap">
                      <span className="field__label">Enter your name</span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="field field_v2">
                    <input
                      className="field__input"
                      type="email"
                      id="email-box"
                      placeholder="Email..."
                    />
                    <span className="field__label-wrap">
                      <span className="field__label">
                        Enter your Email address.
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <label className="field field_v2">
                <textarea
                  className="field__input"
                  style={{ padding: 10, margin: "10px 0 0 0", height: 100 }}
                  id="text-area"
                  placeholder="Enter full message here...."
                ></textarea>
                <span className="field__label-wrap">
                  <span className="field__label">Enter Message/Feedback.</span>
                </span>
              </label>
              <div style={{ textAlign: "center" }}>
                <br />

                {Alert && (
                  <InlineMessage type={Alert.type} message={Alert.message} />
                )}
              </div>
              <br />
              {loading && <Loading />}
              {!loading && (
                <div className="btns-sec">
                  <button
                    type="submit"
                    style={{ margin: "auto", width: 180 }}
                    className="ok__btn"
                  >
                    <i className="fa fa-paper-plane"></i> Send
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
