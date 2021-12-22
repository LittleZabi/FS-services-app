import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/loading";
import Stars from "./stars";
import NumberFormat from "react-number-format";
import axios from "axios";
import { ServiceInfoAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideView = ({ data = [], loading, currency }) => {
  const [favMenu, setFavMenu] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [getFav, setFav] = useState([]);
  const dispatch = useDispatch();
  const FavReq = async (slug, i) => {
    await axios.get("/api/favo-list/" + slug).then((res) => {
      setFav(res.data);
    });
  };
  useEffect(() => {
    if (data.length > 0) FavReq(data[0].slug);
  }, [data]);
  return (
    <div className="client-side">
      <section className="user-info">
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
              <div key={user.id}>
                <div className="profile">
                  <div className="image">
                    <img
                      src={
                        user.avatar === ""
                          ? "/media/users/user1.png"
                          : user.avatar
                      }
                      alt=""
                    />
                  </div>
                  <span>{user.firstname + " " + user.lastname}</span>
                  <Stars stars={user.stars} category={user.category} />
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
                      <td>{user.firstname + " " + user.lastname}</td>
                    </tr>
                    <tr>
                      <td>Joined on</td>
                      <td>{new Date(user.datetime).toDateString()}</td>
                    </tr>
                    <tr>
                      <td>Total spent</td>
                      <td className="highlight">
                        <NumberFormat
                          value={user.total_spent.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={currency[0] === "USD" ? "$" : currency[0]}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>current credits</td>
                      <td className="highlight">
                        <NumberFormat
                          value={(user.crnt_balance * currency[1]).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={currency[0] === "USD" ? "$" : currency[0]}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>From</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {user.country}
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
                <Link to="/logout">
                  <button>
                    <i className="fa fa-user-slash"></i> Logout
                  </button>
                </Link>
              </div>
            );
          })}
      </section>

      <div className="line"></div>
      <section className={favMenu === true ? "open" : ""}>
        <div
          onClick={() => {
            setFavMenu(!favMenu);
            setAddMenu(false);
          }}
          className="drop-low"
        >
          <h3>favourites</h3>
          <i
            className="fa fa-angle-down"
            id={favMenu === true ? "open" : ""}
          ></i>
        </div>

        <div className="favo">
          {getFav.map((fav, i) => {
            return (
              <span
                key={i}
                onClick={() => {
                  dispatch(
                    ServiceInfoAction({ slug: fav.srvc_slug, currency })
                  );
                }}
              >
                {fav.service}
              </span>
            );
          })}
          {getFav.length < 1 && (
            <strong className="alert" style={{ fontSize: 12 }}>
              Your favourite's is empty
            </strong>
          )}
        </div>
      </section>
      <section className={addMenu === true ? "open" : ""}>
        <div
          onClick={() => {
            setAddMenu(!addMenu);
            setFavMenu(false);
          }}
          className="drop-low"
        >
          <h3>billing & addresses</h3>
          <i
            className="fa fa-angle-down"
            id={addMenu === true ? "open" : ""}
          ></i>
        </div>
        <div className="favo">
          {data.length > 0 &&
            data.map((user, i) => {
              return (
                <div key={i}>
                  {user.address1 === "" ? "" : <span>{user.address1}</span>}
                  <span>{user.email}</span>
                  <span>{user.phone}</span>
                  <span>Currency: {user.currency}</span>
                  {user.country === "" ? "" : <span>{user.country}</span>}
                  {user.state === "" ? "" : <span>{user.state}</span>}
                  {user.city === "" ? "" : <span>{user.city}</span>}
                </div>
              );
            })}
        </div>
      </section>
      <br />
    </div>
  );
};
export default SideView;
