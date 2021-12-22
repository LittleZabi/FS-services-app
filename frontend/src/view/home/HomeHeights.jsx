import React, { useEffect } from "react";
import { FaLaptop, FaMobileAlt, FaServer, FaWifi } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserAuthAction } from "../../store/actions";
function HomeHeights() {
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAuthAction());
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="page-view">
        <div className="heights-links fading">
          <ul>
            <li>
              {user.slug !== "" ? (
                <Link to="/placeorder">Place Order</Link>
              ) : (
                <Link to="/register">Get Started</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="heights-white-back fading">
        <div className="page-view heights-inner">
          <div className="heights-cards">
            <Link
              to="/services"
              onClick={() => {
                localStorage.setItem("service", "server");
              }}
            >
              <FaServer />
              <span>Server Services</span>
              <div className="div-line"></div>
              <span className="view-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis delectus cum officiis at aperiam laboriosam nostrum et
                deleniti
              </span>
            </Link>
          </div>
          <div className="heights-cards">
            <Link
              to="/services"
              onClick={() => {
                localStorage.setItem("service", "imei");
              }}
            >
              <FaMobileAlt />
              <span>Mobile IMEI Services</span>
              <div className="div-line"></div>
              <span className="view-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus voluptas sapiente et soluta, repellat sit ducimus,
                eveniet{" "}
              </span>
            </Link>
          </div>
          <div className="heights-cards trd-child">
            <Link
              to="/services"
              onClick={() => {
                localStorage.setItem("service", "remote");
              }}
            >
              <FaWifi />
              <span>Remote Services</span>
              <div className="div-line"></div>
              <span className="view-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore reprehenderit consequatur corrupti aliquam incidunt
                sapiente minus possimus.
              </span>
            </Link>
          </div>
        </div>
        <div className="page-view">
          <div className="heights-third">
            <span className="title">
              <span className="h1-title">24Hour</span> Support
            </span>
            <span className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
              maiores expedita saepe ut aspernatur error doloribus reiciendis
              possimus harum delectus rerum id consequatur voluptates quae
              molestiae, hic quidem modi itaque. Aperiam quod facere eos
              dignissimos mollitia nisi iste eum, id similique ab? Suscipit,
              nobis delectus incidunt numquam eum porro laudantium itaque nam
              aspernatur obcaecati sequi odio in, quae quasi saepe.
            </span>
          </div>

          <div className="page-view heights-inner in-list">
            <div className="heights-cards">
              <FaLaptop />
              <span>Function Overloading</span>
              <div className="div-line"></div>
              <span className="view-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis commodi deserunt, eligendi, sint, asperiores earum quod
              </span>
            </div>
            <div className="heights-cards">
              <FaLaptop />
              <span>Function Overloading</span>
              <div className="div-line"></div>
              <span className="view-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis commodi deserunt, eligendi, sint, asperiores earum quod
              </span>
            </div>
          </div>
          <div className="div-line"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeHeights;
