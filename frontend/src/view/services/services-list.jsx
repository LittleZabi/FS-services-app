import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import InlineMessage from "../../components/inilne-message";
import { useDispatch } from "react-redux";
import Loading from "../../components/loading";
import { ServiceInfoAction } from "../../store/actions";
export default function ServicesList({ currency }) {
  const dispatch = useDispatch();
  const [service_list, setServiceList] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [searching, setSearcing] = useState(false);
  // const crncy_red = useSelector((state) => state.CrncyExchangeRed);
  const getSrc = async (type) => {
    setServiceName(type);
    setServiceList([]);

    try {
      setLoading(true);
      await axios.get(`/api/get-srvc/${type}`).then((response) => {
        if (response.data.length > 0) {
          setMessage(false);
          setServiceList(response.data);
        } else {
          setMessage({
            type: "alert",
            message: "No Data Found in " + type + " list.",
          });
        }
        setLoading(false);
      });
    } catch (err) {
      setMessage({ type: "error", message: "Error: " + err.message });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("service")) {
      const service = localStorage.getItem("service");
      getSrc(service);
      localStorage.removeItem("service");
    } else {
      getSrc("all");
    }
  }, []);
  const handleSearch = async (value) => {
    if (value.length > 0) {
      setLoading(true);
      setSearcing(true);
      await axios.get(`/api/search/${value}`).then((res) => {
        if (res.data.length > 0) {
          setMessage(false);
          setServiceList(res.data);
        } else {
          setMessage({
            type: "alert",
            message: "Search with (" + value + ") emtpy result found.",
          });
        }
        setLoading(false);
      });
    } else {
      getSrc(serviceName);
      setSearcing(false);
      setMessage(false);
    }
    if (value.length === 0) {
      getSrc("remote");
    }
  };
  return (
    <div className="page-view fading ">
      <div className="fading">
        <div className="hot-links mt-70">
          <Link to="/">
            <FaHome />
          </Link>
          <span>services</span>
        </div>
      </div>

      <div className="services-show">
        <div className="container-head">
          <ul>
            <li>
              <button
                onClick={() => getSrc("all")}
                className={serviceName === "all" ? "open" : ""}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => getSrc("server")}
                className={serviceName === "server" ? "open" : ""}
              >
                Server
              </button>
            </li>
            <li>
              <button
                onClick={() => getSrc("remote")}
                className={serviceName === "remote" ? "open" : ""}
              >
                Remote
              </button>
            </li>
            <li>
              <button
                onClick={() => getSrc("imei")}
                className={serviceName === "imei" ? "open" : ""}
              >
                IMEI
              </button>
            </li>
            <li>
              <button
                onClick={() => getSrc("other")}
                className={serviceName === "other" ? "open" : ""}
              >
                Others
              </button>
            </li>
            <li>
              <Link className="" to="/client">
                Client Area
              </Link>
            </li>
          </ul>
        </div>

        <div className="Input">
          <input
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            type="text"
            id="input"
            className="Input-text"
            placeholder="Search your service, e.g. imei service"
          />
        </div>

        <h1>
          {searching && "Search service results"}
          {!searching && (
            <>
              <span style={{ textTransform: "uppercase" }}>{serviceName}</span>{" "}
              Services list
            </>
          )}
        </h1>
        {loading && <Loading />}
        {!loading && message && (
          <InlineMessage
            styles={{ textAlign: "center" }}
            type={message.type}
            message={message.message}
          />
        )}
        {!loading && !message && (
          <table>
            <thead>
              <tr className="fading">
                <th>Services</th>
                <th>Devlivery</th>
                <th>category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {service_list.map((src) => {
                return (
                  <tr
                    className="fading"
                    key={src.srvc_slug}
                    onClick={() => {
                      dispatch(
                        ServiceInfoAction({ slug: src.srvc_slug, currency })
                      );
                    }}
                  >
                    <td>{src.service}</td>
                    <td>{src.deli_time} Minutes</td>
                    <td>{src.category}</td>
                    <td>
                      {(src.price * currency[1]).toFixed(2)}
                      {currency[0] === "USD" ? "$" : currency[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <br />
      </div>
    </div>
  );
}
