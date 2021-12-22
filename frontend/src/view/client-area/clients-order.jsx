import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ServiceInfoAction } from "../../store/actions";
import Loading from "../../components/loading";
import InlineMessage from "../../components/inilne-message";
export default function MyOrder({ currency }) {
  const dispatch = useDispatch();
  const [OrderDetailsList, setOrderDetailsList] = useState([{}]);
  const [loadingList, setLoadingList] = useState(false);
  const [messageList, setMessageList] = useState(false);
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
                message: "Your order history is empty",
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
    getOrdersHistoryList();
  }, []);

  return (
    <div className="page-view fading">
      <div className="services-show client-services">
        <h1>Your orders history</h1>
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
                  <th>Status</th>
                  <th>Paid</th>
                  <th>Price</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {OrderDetailsList.map((order_detail, i) => {
                  return (
                    <tr
                      key={i}
                      onClick={() => {
                        window.open("/my-order/" + order_detail.id, "_blank");
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
                          <>
                            <i className="fa fa-check"></i> Completed
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td style={{ color: "dodgerblue", fontWeight: "bold" }}>
                        {(order_detail.paid * currency[1]).toFixed(2)}
                        {currency[0] === "USD" ? "$" : currency[0]}
                      </td>

                      <td style={{ color: "dodgerblue", fontWeight: "bold" }}>
                        {(order_detail.price * currency[1]).toFixed(2)}
                        {currency[0] === "USD" ? "$" : currency[0]}
                      </td>
                      <td>{new Date(order_detail.datetime).toDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>

        <br />
      </div>
    </div>
  );
}
