import NumberFormat from "react-number-format";
import Loading from "../../components/loading";
import Awards from "./awards";
import MyOrder from "./clients-order";
import Stars from "./stars";

const MainView = ({ data = [], loading, currency }) => {
  return (
    <div className="client-main">
      {loading && (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Loading />
        </>
      )}
      {!loading &&
        data.length > 0 &&
        data.map((user, i) => {
          return (
            <div key={i} className="balance-details">
              <div className="bal">
                <span>
                  <NumberFormat
                    value={(user.crnt_balance * currency[1]).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={currency[0] === "USD" ? "$" : currency[0]}
                  />
                </span>
                <button
                  onClick={() => (window.location.href = "/payment-request")}
                >
                  <i className="fa fa-dollar"></i> Buy Credits
                </button>
              </div>
              <div>
                <span className="bal-msg">
                  <span
                    style={{ display: "inline", textTransform: "uppercase" }}
                  >
                    {user.category}
                  </span>{" "}
                  Rank user
                </span>
                <span className="bal-msg-desc">
                  Find more clients to upgrade your Ranking to next level and
                  buy products in cheap rates.
                </span>
                <p className="bal-msg">
                  <small>Rating information.</small>
                </p>
                <Stars
                  stars={user.stars}
                  category={user.category}
                  classes="stars-info"
                />
                {user.message !== "" && (
                  <span className="bal-msg">
                    <small>Ranking status</small>{" "}
                    <span className="bal-msg-desc">{user.message}</span>
                  </span>
                )}
                <Awards category={user.category} />
              </div>
            </div>
          );
        })}
      <br />
      <div className="order-sec">
        <div className="line"></div>
        <MyOrder currency={currency} />
      </div>
    </div>
  );
};
export default MainView;
