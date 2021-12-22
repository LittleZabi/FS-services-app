import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ServiceInfoAction } from "../../store/actions";
import Loading from "../../components/loading";
import InlineMessage from "../../components/inilne-message";
export default function MyOrder({ currency }) {
  const order_slug = useParams().slug;
  const dispatch = useDispatch();
  const [order_detail, setOrderDetail] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [message1, setMessage1] = useState(false);
  const [OrderDetailsList, setOrderDetailsList] = useState([{}]);
  const [loadingList, setLoadingList] = useState(false);
  const [messageList, setMessageList] = useState(false);

  const getOrderDetails = async (order_slug) => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      const user_slug = user.slug;

      try {
        setLoading(true);
        await axios
          .post(`/api/order-details/`, {
            order_slug,
            user: user_slug,
          })
          .then((response) => {
            const res_cond = response.data.condition;
            if (res_cond === "noOrdersFound") {
              setMessage1({ type: "alert", message: "Order not found" });
            }
            if (res_cond === "OrderNotExist") {
              setMessage1({ type: "alert", message: "Order not found" });
            }
            if (res_cond === "success") {
              setOrderDetail(response.data.order);
              console.log(response.data.order);
            }
            setLoading(false);
          });
      } catch {
        setLoading(false);
      }
    } else {
      setMessage1({ type: "alert", message: "user not logged please login!" });
    }
  };

  const getOrdersHistoryList = async () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      const user_slug = user.slug;
      try {
        setLoadingList(true);
        await axios
          .post(`/api/order-history/`, {
            user: user_slug,
          })
          .then((response) => {
            const res_cond = response.data.condition;
            if (res_cond === "OrderNotExist") {
              setMessageList({
                type: "alert",
                message: "Your nothing buy before!",
              });
            }
            if (res_cond === "success") {
              setOrderDetailsList(response.data.order);
            }
            setLoadingList(false);
          });
      } catch {
        setLoadingList(false);
      }
    } else {
      setMessageList({
        type: "alert",
        message: "user not logged please login!",
      });
    }
  };
  useEffect(() => {
    getOrderDetails(order_slug);
    getOrdersHistoryList();
  }, [order_slug]);

  return (
    <div className="page-view fading">
      <div className="fading">
        <div className="hot-links">
          <Link to="/">
            <FaHome />
          </Link>
          <Link to="/">USER</Link>
          <span>MY ORDER</span>
        </div>
      </div>
      <div className="services-show">
        <div className="basic-msg">
          <span>
            If the order is canceled by some reason! then your payments will be
            back to your account.
          </span>
        </div>
        <span className="span-header" style={{ fontSize: 20 }}>
          Order ID: {order_slug}
        </span>
        {loading && <Loading />}
        {!loading && (
          <>
            {message1 && (
              <div style={{ textAlign: "center" }}>
                <InlineMessage
                  type={message1.type}
                  message={message1.message}
                />
              </div>
            )}
            {!message1 && (
              <table className="view-order">
                <span className="span-header">
                  order placed date:{" "}
                  {new Date(order_detail[0].datetime).toDateString()}
                </span>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Service name</td>
                    <td>{order_detail[0].service_name}</td>
                  </tr>
                  <tr>
                    <td>Progress Status</td>
                    <td
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                      className={
                        order_detail[0].status === "complete"
                          ? "success success-bg"
                          : order_detail[0].status === "pending"
                          ? "alert alert-bg"
                          : order_detail[0].status === "processing"
                          ? "alert processing"
                          : "error error-bg"
                      }
                    >
                      {order_detail[0].status === "pending" ? (
                        "Pending"
                      ) : order_detail[0].status === "canceled" ? (
                        "Canceled"
                      ) : order_detail[0].status === "processing" ? (
                        "Processing"
                      ) : order_detail[0].status === "complete" ? (
                        <>
                          <i className="fa fa-check"></i> Completed
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Service</td>
                    <td>{order_detail[0].service_type}</td>
                  </tr>
                  <tr>
                    <td>category</td>
                    <td>{order_detail[0].categ_name}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td style={{ color: "#fe4500", fontWeight: "bold" }}>
                      {(order_detail[0].price * currency[1]).toFixed(2)}
                      {currency[0] === "USD" ? "$" : currency[0]}
                    </td>
                  </tr>
                  <tr>
                    <td>Paid total</td>
                    <td style={{ color: "#fe4500", fontWeight: "bold" }}>
                      {(order_detail[0].paid * currency[1]).toFixed(2)}
                      {currency[0] === "USD" ? "$" : currency[0]}
                    </td>
                  </tr>
                  <tr>
                    <td>Estimate Devlivery Time</td>
                    <td>
                      {order_detail[0].deli_time}
                      {"-Minutes"}
                    </td>
                  </tr>
                  {order_detail[0].input1 && (
                    <tr>
                      <td>Your giving information</td>
                      <td>{order_detail[0].input1}</td>
                    </tr>
                  )}
                  {order_detail[0].input2 && (
                    <tr>
                      <td>Your giving information</td>
                      <td>{order_detail[0].input2}</td>
                    </tr>
                  )}
                  {order_detail[0].input3 && (
                    <tr>
                      <td>Your giving information</td>
                      <td>{order_detail[0].input3}</td>
                    </tr>
                  )}
                  {order_detail[0].input4 && (
                    <tr>
                      <td>Your giving information</td>
                      <td>{order_detail[0].input4}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
        <div className="basic-msg">
          <span>
            If your order is not in <b>Pending State</b> then you can not change
            or modified your order! because the order will be on Processing or
            complete state!
          </span>
        </div>
        <br />
      </div>
      <div className="services-show">
        <h1>Your orders history</h1>
        {loadingList && <Loading />}
        {!loadingList && (
          <>
            {messageList && (
              <div style={{ textAlign: "center" }}>
                <InlineMessage
                  type={messageList.type}
                  message={messageList.message}
                />
              </div>
            )}
            {!messageList && (
              <table>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Progress Status</th>
                    <th>Service</th>
                    <th>category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderDetailsList.map((order_detail, i) => {
                    return (
                      <tr
                        key={i}
                        onClick={() => {
                          dispatch(
                            ServiceInfoAction({
                              slug: order_detail.service,
                              currency,
                            })
                          );
                        }}
                      >
                        <td>{order_detail.service_name}</td>
                        <td
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                          className={
                            order_detail.status === "complete"
                              ? "success success-bg"
                              : order_detail.status === "pending"
                              ? "alert alert-bg"
                              : order_detail.status === "processing"
                              ? "alert processing"
                              : "error error-bg"
                          }
                        >
                          {order_detail.status === "pending" ? (
                            "Pending"
                          ) : order_detail.status === "canceled" ? (
                            "Canceled"
                          ) : order_detail.status === "processing" ? (
                            "Processing"
                          ) : order_detail.status === "complete" ? (
                            <i className="fa fa-check"></i>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{order_detail.service_type}</td>
                        <td>{order_detail.categ_name}</td>
                        <td style={{ fontWeight: "bold" }}>
                          {(order_detail.price * currency[1]).toFixed(2)}
                          {currency[0] === "USD" ? "$" : currency[0]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
        <br />
      </div>
    </div>
  );
}
