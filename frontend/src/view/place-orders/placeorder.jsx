import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaHome } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import Loading from "../../components/loading";
import InlineMessage from "../../components/inilne-message";
import RightSide from "./right-side";
import { MessageAction } from "../../store/actions";
import { useDispatch } from "react-redux";
const PlaceOrders = ({ currency }) => {
  const [src_type, setSrcType] = useState("all");
  const [srvcList, setSrcList] = useState([{ description: "" }]);
  const [loading, setLoading] = useState(false);
  const [Sideloading, setSideLoading] = useState(false);
  const [GrabOrder, setGrabOrder] = useState({});
  const [userState, setUserState] = useState(false);
  const [user_not_logged, userNotLogged] = useState(false);
  const [messageState, setMessageState] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [_user_, setUser] = useState({ slug: "" });

  const CheckUser = async (currency) => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUserState(user);
      await axios.get("/api/user/" + user.slug).then((res) => {
        if (res.data.length > 0) {
          setUser(res.data[0]);
        } else {
          setMessageState({ type: "error", message: "Please login first..." });
        }
      });
    } else {
      userNotLogged(true);
      setUserState({
        user_id: "",
        type: "alert",
        message: "user is not logged please login than you can place a order!",
      });
    }
  };

  const getSrcList = useCallback(async () => {
    setSideLoading(true);
    await axios.get("/api/get-srvc/" + src_type).then((res) => {
      setSrcList(res.data);
      setSideLoading(false);
    });
  }, [src_type]);
  const grabService = async (slug) => {
    setLoading(true);
    setGrabOrder({});
    await axios.get("/api/grab-srvc/" + slug).then((res) => {
      setMessageState(false);
      setShowLink(false);
      setGrabOrder(res.data);
      setLoading(false);
    });
  };
  const check_order_slug = () => {
    const slug = localStorage.getItem("order-id");
    if (slug) {
      grabService(slug);
    }
  };
  useEffect(() => {
    CheckUser(currency[0]);
    getSrcList();
    check_order_slug();
    if (window.innerWidth < 992) {
      if (document.querySelector("div.main-container")) {
        document.querySelector("div.main-container").setAttribute("id", "main");
      }
    }
  }, [getSrcList]);

  const handleSearch = async (value) => {
    if (value.length > 2) {
      setSideLoading(true);
      await axios.get(`/api/search/${value}`).then((res) => {
        if (res.data.length > 0) {
          setSrcList(res.data);
        }
        setSideLoading(false);
      });
    }
    if (value.length === 0) {
      getSrcList();
    }
  };
  const PlaceOrderServer = async (data) => {
    setReqLoading(true);
    try {
      await axios.post("/api/place-order/", { data: data }).then((res) => {
        const response = res.data;
        if (response.condition === "UsrNtActive") {
          setMessageState({
            type: "alert",
            message:
              "User is Exist but not Activated. on any situation please contact with Admin.",
          });
        } else if (response.condition === "dataNotFilled") {
          setMessageState({
            type: "alert",
            message: "Data is not enough please refresh and try again!",
          });
        } else if (response.condition === "UserNotExist") {
          setMessageState({
            type: "error",
            message: "User Not found Please Login or Register first!",
          });
          userNotLogged(true);
        } else if (response.condition === "success") {
          setMessageState({
            type: "success",
            message: "Your order successfully placed!",
          });
          CheckUser();
          setShowLink({
            link: response.link,
          });
        } else if (response.condition === "BlncNotEnough") {
          setMessageState({
            type: "alert",
            message:
              "Credits is not enough for this request! Please request for payment ",
          });
        }
        setReqLoading(false);
      });
    } catch (error) {
      setReqLoading(false);
      setMessageState({
        type: "error",
        message: "Error occured during placing order. try again!",
      });
    }
  };
  const handleOrderForm = (e) => {
    e.preventDefault();
    let user_balance = _user_.crnt_balance;
    let service_price = GrabOrder.price;
    let discount = _user_.discount;
    service_price = service_price - discount;
    if (user_balance < service_price) {
      setMessageState({
        type: "alert",
        message:
          "Credits is not enough for this request! your current balance is " +
          (user_balance * currency[1]).toFixed(2) +
          currency[0] +
          " and service price is " +
          (service_price * currency[1]).toFixed(2) +
          currency[0],
      });
      return 0;
    }
    const user = e.target["user-id"].value;
    var input1 = "";
    var input2 = "";
    var input3 = "";
    var input4 = "";
    var service_type = "";
    var service_slug = "";
    var service_categ = "";
    var service_name = "";
    if (user.length > 0) {
      input1 = e.target["input1"];
      input2 = e.target["input2"];
      input3 = e.target["input3"];
      input4 = e.target["input4"];
      service_categ = e.target["srvc_categ"].value;
      service_type = e.target["srvc_type"].value;
      service_slug = e.target["srvc_slug"].value;
      service_name = e.target["srvc_name"].value;
      if (typeof input1 != "undefined") {
        input1 = input1.value;
      } else {
        input1 = "";
      }
      if (typeof input2 != "undefined") {
        input2 = input2.value;
      } else {
        input2 = "";
      }
      if (typeof input3 != "undefined") {
        input3 = input3.value;
      } else {
        input3 = "";
      }
      if (typeof input4 != "undefined") {
        input4 = input4.value;
      } else {
        input4 = "";
      }
      if (input1 === "" && input2 === "" && input3 === "") {
        setMessageState({
          type: "alert",
          message: "Please fill the inputs",
        });
        return 1;
      } else {
        PlaceOrderServer({
          input1,
          input2,
          input3,
          input4,
          user,
          service_type,
          service_slug,
          service_categ,
          service_name,
        });
      }
    } else {
      setMessageState({
        type: "error",
        message: "User not found please login first!",
      });
    }
  };

  const dispatch = useDispatch();
  return (
    <>
      <div className="page-view fading">
        {user_not_logged &&
          dispatch(
            MessageAction(
              "alert",
              "Please login than you can check client area, your profile, overview, and settings."
            )
          )}
        {user_not_logged && <Navigate to="/login" replace={false} />}
        <div className="hot-links mt-70">
          <Link to="/">
            <FaHome />
          </Link>
          <span>Place Order</span>
        </div>
      </div>
      <div className="placeorder-top">
        <div className="filter-inputs">
          <select onChange={(e) => setSrcType(e.target.value)}>
            <option value="all">All</option>
            <option value="imei">IMEI</option>
            <option value="server">SERVER</option>
            <option value="remote">REMOTE</option>
            <option value="other">OTHERS</option>
          </select>
          <input
            type="text"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="page-view placeorder-view">
        <div className="side-bar">
          <div>
            <div className="side-bar-links">
              {Sideloading && (
                <div style={{ marginTop: 70 }}>
                  <Loading />
                </div>
              )}
              {!Sideloading &&
                srvcList.map((e, i) => {
                  return (
                    <a href="#main" key={i}>
                      <ul
                        className="fading"
                        onClick={() => grabService(e.srvc_slug)}
                      >
                        <li>{e.service}</li>
                        <li>
                          <strong>
                            {" "}
                            {(e.price * currency[1]).toFixed(2)}
                            {currency[0] === "USD" ? "$" : currency[0]}
                          </strong>
                        </li>
                        <li>
                          <strong>delivery: {e.deli_time} minuts</strong>
                        </li>
                      </ul>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="main-container">
          {loading && (
            <div style={{ marginTop: 107 }}>
              <Loading />
            </div>
          )}

          {!loading && (
            <>
              <section className="fading">
                <span className="order-title">{GrabOrder.service}</span>
                <div className="order-details">
                  Price:{" "}
                  {GrabOrder.price === 0
                    ? "Free"
                    : (GrabOrder.price * currency[1]).toFixed(2) +
                      (currency[0] === "USD" ? "$" : currency[0])}
                  <br />
                  {_user_.discount > 0 && GrabOrder.price > 0 && (
                    <>
                      <span className="dicount-number">
                        Discount:{" "}
                        {(_user_.discount * currency[1]).toFixed(2) +
                          currency[0] +
                          " "}
                        <p>({_user_.category} Rank)</p>
                      </span>
                      <br />
                      {(
                        GrabOrder.price * currency[1] -
                        _user_.discount * currency[1]
                      ).toFixed(2)}
                      {currency[0] === "USD" ? "$" : currency[0]} is your new
                      price
                    </>
                  )}
                  <br />
                  <br />
                  <span>{GrabOrder.deli_time} Minutes Dilvery time</span>
                  <div className="div-line"></div>
                </div>
                <div className="order-inputs">
                  <div className="main-form" style={{ width: "100%" }}>
                    <div className="blue-reg-form fading">
                      <h3>Fill the required inputs</h3>
                      <form onSubmit={handleOrderForm}>
                        <input
                          type="hidden"
                          id="user-id"
                          value={userState.slug}
                        />
                        <input
                          type="hidden"
                          id="srvc_type"
                          value={GrabOrder.service_type}
                        />

                        <input
                          type="hidden"
                          id="srvc_slug"
                          value={GrabOrder.srvc_slug}
                        />
                        <input
                          type="hidden"
                          id="srvc_categ"
                          value={GrabOrder.category}
                        />
                        <input
                          type="hidden"
                          id="srvc_name"
                          value={GrabOrder.service}
                        />
                        {GrabOrder.input1 !== "" ? (
                          <>
                            <label className="field field_v2">
                              <input
                                className="field__input"
                                placeholder="enter the required feild..."
                                id="input1"
                              />
                              <span className="field__label-wrap">
                                <span className="field__label">
                                  {GrabOrder.input1}
                                </span>
                              </span>
                            </label>
                          </>
                        ) : (
                          ""
                        )}
                        {GrabOrder.input2 !== "" ? (
                          <>
                            <label className="field field_v2">
                              <input
                                className="field__input"
                                placeholder="enter the required feild..."
                                id="input2"
                              />
                              <span className="field__label-wrap">
                                <span className="field__label">
                                  {GrabOrder.input2}
                                </span>
                              </span>
                            </label>
                          </>
                        ) : (
                          ""
                        )}

                        {GrabOrder.input3 !== "" ? (
                          <>
                            <label className="field field_v3">
                              <textarea
                                className="field__input"
                                placeholder="enter the required feild...."
                                id="input3"
                              ></textarea>
                              <span className="field__label-wrap">
                                <span className="field__label">
                                  {GrabOrder.input3}
                                </span>
                              </span>
                            </label>
                          </>
                        ) : (
                          ""
                        )}
                        {GrabOrder.input4 !== "" ? (
                          <>
                            <label className="field field_v3">
                              <textarea
                                className="field__input"
                                placeholder="enter the required feild...."
                                id="input4"
                              ></textarea>
                              <span className="field__label-wrap">
                                <span className="field__label">
                                  {GrabOrder.input4}
                                </span>
                              </span>
                            </label>
                          </>
                        ) : (
                          ""
                        )}
                        {messageState && (
                          <InlineMessage
                            type={messageState.type}
                            message={messageState.message}
                          />
                        )}
                        {userState && (
                          <InlineMessage
                            type={userState.type}
                            message={userState.message}
                          />
                        )}
                        {showLink && (
                          <div>
                            <p className="inline-alert success">
                              go to on the order link to see your order
                              progress!
                            </p>
                            <a
                              href={showLink.link}
                              className="inline-alert alert"
                            >
                              {showLink.link}
                            </a>
                            <p className="inline-alert success">
                              Button Disabled
                            </p>
                          </div>
                        )}
                        {reqLoading && <Loading />}
                        {!reqLoading && (
                          <div className="btns-sec">
                            <button
                              disabled={showLink ? true : false}
                              className="ok__btn"
                              type="submit"
                              id="order-input-1"
                              value="Place Order"
                              style={{ width: 198 }}
                            >
                              Place order
                            </button>
                          </div>
                        )}
                        <div className="basic-msg">
                          <span>
                            If the order is canceled by some reason! then your
                            payments will be back to your account.
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
        <RightSide
          data={{
            currency,
            description: GrabOrder.description,
            user: _user_,
            loading,
          }}
        />
      </div>
    </>
  );
};
export default PlaceOrders;
