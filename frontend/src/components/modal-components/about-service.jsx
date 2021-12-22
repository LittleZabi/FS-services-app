import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../store/constants";
import InlineMessage from "../inilne-message";
import Loading from "../loading";

const AboutService = () => {
  const payload = useSelector((state) => state.TopReducer);
  const slug = payload.payload.data.src_view_slug;
  const currency = payload.payload.data.currency;
  const [loading, setLoading] = useState(false);
  const [src_view, setSrcView] = useState([]);
  const [inFavorite, setInFavorite] = useState(false);
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const user_ = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      getFavo(user.slug);
      setUser(user);
    }
  };
  const getSrcView = async (slug) => {
    try {
      setLoading(true);
      await axios.get("/api/view-src/" + slug).then((res) => {
        setSrcView(res.data);
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }
  };
  const getFavo = async (user) => {
    await axios.get(`/api/get-fav/${user}`).then((res) => {
      res.data.map((e) => e.item === slug && setInFavorite(true));
    });
  };
  const handleFavo = async (action, slug) => {
    if (user.slug && user.slug !== "") {
      if (action === "add")
        setMessage({ type: "success", message: "Adding on Favorite!" });
      else if (action === "rem")
        setMessage({ type: "alert", message: "Removing from Favorite!" });
      await axios
        .get(`/api/handle-fav/${user.slug}/${action}/${slug}/services_list`)
        .then((res) => {
          if (res.data === "deleted") {
            setInFavorite(false);
            setMessage({
              type: "alert",
              message: "Removed from your favourite!",
            });
          } else if (res.data === "success") {
            setInFavorite(true);
            setMessage({
              type: "success",
              message: "Added on your favourite!",
            });
          }
        });
    } else {
      setMessage({ type: "alert", message: "Please login first!" });
    }
  };
  useEffect(() => {
    user_();
    getSrcView(slug);
  }, [slug]);

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        src_view.map((res) => {
          return (
            <div key={res.id} className="services-show">
              <br />
              <h2>{res.service}</h2>
              {!inFavorite && (
                <span
                  onClick={() => handleFavo("add", res.srvc_slug)}
                  className="add-to-fav"
                >
                  Add to favorite<i className="fa fa-star"></i>
                </span>
              )}

              {inFavorite && (
                <span
                  onClick={() => handleFavo("rem", res.srvc_slug)}
                  className="add-to-fav open"
                >
                  Your Favorite<i className="fa fa-star"></i>
                </span>
              )}
              {message && (
                <InlineMessage type={message.type} message={message.message} />
              )}
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Price</td>
                    <td>
                      {(res.price * currency[1]).toFixed(2)}
                      {currency[0] === "USD" ? "$" : currency[0]}
                    </td>
                  </tr>
                  {res.deli_time !== "" ? (
                    <tr>
                      <td>Delivery time</td>
                      <td>{res.deli_time} Minutes</td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {res.category !== "" ? (
                    <tr>
                      <td>Category</td>
                      <td>{res.category}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {res.service_type !== "" ? (
                    <tr>
                      <td>Service Type</td>
                      <td>{res.service_type}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {res.order_process !== "" ? (
                    <tr>
                      <td>Order Proccess</td>
                      <td>{res.order_process}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  <tr>
                    <td>Description</td>
                    <td>{res.description === "" ? "..." : res.description}</td>
                  </tr>
                </tbody>
              </table>

              <div className="view-mat btns-sec">
                <br />
                <button
                  className="ok__btn"
                  style={{ width: 198 }}
                  onClick={() => {
                    localStorage.setItem("order-id", slug);
                    window.location.href = "/placeorder";
                  }}
                >
                  Place order
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
                  Close
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default AboutService;
