import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
import Stars from "../client-area/stars";

const RightSide = ({ data }) => {
  return (
    <div className="right-side">
      <section className="user-info">
        {data.loading && (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Loading />
          </>
        )}
        {!data.loading && (
          <>
            <div key={data.user.id}>
              <div className="profile">
                <div className="image">
                  <img
                    src={
                      data.user.avatar === ""
                        ? "/media/users/user1.png"
                        : data.user.avatar
                    }
                    alt=""
                  />
                </div>
                <span>{data.user.firstname + " " + data.user.lastname}</span>
                <Stars stars={data.user.stars} category={data.user.category} />
              </div>
              <div className="line"></div>
              <h3>User Information</h3>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Profile</td>
                    <td>{data.user.firstname + " " + data.user.lastname}</td>
                  </tr>
                  <tr>
                    <td>Joined on</td>
                    <td>{new Date(data.user.datetime).toDateString()}</td>
                  </tr>
                  <tr>
                    <td>Total spent</td>
                    <td className="highlight">
                      <NumberFormat
                        value={(
                          data.user.total_spent * data.currency[1]
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={
                          data.currency[0] === "USD" ? "$" : data.currency[0]
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>current credits</td>
                    <td className="highlight">
                      <NumberFormat
                        value={(
                          data.user.crnt_balance * data.currency[1]
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={
                          data.currency[0] === "USD" ? "$" : data.currency[0]
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Rank</td>
                    <td
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      {data.user.category}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => (window.location.href = "payment-request")}
              >
                <i className="fa fa-dollar"></i> Buy Credits
              </button>
              <Link to="/profile">
                <button>
                  <i className="fa fa-user"></i> Edit Profile
                </button>
              </Link>
            </div>
          </>
        )}
      </section>

      <h4>About Service</h4>
      {data.description !== "" ? (
        <span className="fading">{data.description}</span>
      ) : (
        "fill the required fields and click on the place order button. your order will be send! "
      )}
    </div>
  );
};
export default RightSide;
