import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InlineMessage from "../../components/inilne-message";
import { ShowModalAction } from "../../store/actions";
import Loading from "../../components/loading";
function Profile() {
  const [Alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_status, setUserlogged] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    currency: "",
    postal: "",
    datetime: "",
    slug: "",
  });
  const dispatch = useDispatch();

  const getUser = async () => {
    let user_info = localStorage.getItem("user");
    user_info = JSON.parse(user_info);
    try {
      if (user_info !== null) {
        if (
          user_info.slug !== null &&
          user_info.slug !== undefined &&
          user_info.slug.length > 0
        ) {
          await axios.get("/api/user/" + user_info.slug).then((res) => {
            setUserlogged(false);
            const {
              email,
              firstname,
              lastname,
              address1,
              address2,
              country,
              state,
              avatar,
              currency,
              city,
              postal,
              datetime,
              slug,
            } = res.data[0];
            setFormData({
              email,
              firstname,
              lastname,
              address1,
              avatar,
              currency,
              address2,
              country,
              state,
              city,
              postal,
              datetime,
              slug,
            });
          });
        }
      } else {
        setUserlogged(true);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);

  const SendData = async (userData) => {
    setLoading(true);
    try {
      await axios
        .post("/api/update-user/", { formData: userData })
        .then((res) => {
          res = res.data.condition;
          if (res === "updated") {
            setAlert({
              type: "success",
              message: "successfully Updated!",
            });
            dispatch(ShowModalAction("succ-update"));
          } else {
            setAlert({
              type: "alert",
              message: "error on updating profile please try again later!",
            });
          }

          setLoading(false);
        });
    } catch {
      setLoading(false);
      setAlert({
        type: "error",
        message: "something going wrong please try again!",
      });
    }
  };
  const handleForm = (event) => {
    event.preventDefault();
    const firstname = event.target["first-name"].value;
    const lastname = event.target["last-name"].value;
    const address1 = event.target["address-1"].value;
    const address2 = event.target["address-2"].value;
    const country = event.target["country"].value;
    const state = event.target["state"].value;
    const city = event.target["city"].value;
    const postal = event.target["zip"].value;
    const slug = event.target["slug"].value;
    const currency = event.target["currency"].value;
    setAlert(false);
    setFormData({
      firstname,
      lastname,
      address1,
      address2,
      country,
      state,
      city,
      postal,
      slug,
      currency,
    });

    if (firstname === "" || lastname === "") {
      setAlert({
        type: "alert",
        message: "Enter firstname and lastname!",
      });
    } else if (address1 === "") {
      setAlert({
        type: "alert",
        message: "Please Enter Addresses!",
      });
    } else if (country === "") {
      setAlert({
        type: "alert",
        message: "Please Enter country name!",
      });
    } else {
      SendData({
        firstname,
        lastname,
        address1,
        address2,
        country,
        state,
        city,
        postal,
        slug,
        currency,
      });
    }
  };
  const BillingInfo = () => {
    return (
      <>
        <h3>BILLING INFORMATION</h3>
        <div className="flex-box">
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                type="text"
                name="first-name"
                id="first-name"
                defaultValue={formData.firstname}
                placeholder="First Name..."
              />
              <span className="field__label-wrap">
                <span className="field__label">Your firstname.</span>
              </span>
            </label>
          </div>
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                type="text"
                name="last-name"
                id="last-name"
                defaultValue={formData.lastname}
                placeholder="Last Name..."
              />
              <span className="field__label-wrap">
                <span className="field__label">Your Lastname.</span>
              </span>
            </label>
          </div>
        </div>
        <div className="flex-box">
          <div>
            <label htmlFor="currency" className="form-labels">
              Select Currency.
            </label>
            <select name="currency" id="currency">
              <option value={formData.currency} defaultValue>
                {formData.currency}
              </option>
              <option value="PKR">PKR (Pakistani Rupee)</option>
              <option value="USD">USD (Dollar)</option>
              <option value="AFN">AFN (Afghani)</option>
              <option value="AUD">AUD (Australian Dollar)</option>
              <option value="INR">INR (Indian Rupee</option>
              <option value="AZN">AZN (Azerbaijan manat)</option>
              <option value="BDT">BDT (Bangladeshi taka)</option>
              <option value="BHD">BHD (Bahraini dinar)</option>
              <option value="EUR">EUR (European euro)</option>
              <option value="BRL">BRL (Brazilian real)</option>
              <option value="CAD">CAD (Canadian dollar)</option>
              <option value="CNY">CNY (Chinese Yuan Renminbi)</option>
              <option value="EGP">EGP (Egyptian pound)</option>
              <option value="IDR">IDR (Indonesian rupiah)</option>
              <option value="IRR">IRR (Iranian rial)</option>
              <option value="IQD">IQD (Iraqi dinar)</option>
              <option value="ILS">ILS (Israeli new shekel)</option>
              <option value="JPY">JPY (Japanese yen)</option>
              <option value="KWD">KWD (Kuwaiti dinar)</option>
            </select>
          </div>
        </div>
        <label className="field field_v2">
          <input
            className="field__input"
            type="text"
            id="address-1"
            defaultValue={formData.address1}
            placeholder="Residence Address..."
          />
          <span className="field__label-wrap">
            <span className="field__label">Enter your Residence Address.</span>
          </span>
        </label>
        <label className="field field_v2">
          <input
            className="field__input"
            type="text"
            id="address-2"
            defaultValue={formData.address2}
            placeholder="Secondary Address..."
          />
          <span className="field__label-wrap">
            <span className="field__label">
              Enter your Secondary Address (optional).
            </span>
          </span>
        </label>

        <div className="flex-box">
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                type="text"
                id="country"
                defaultValue={formData.country}
                placeholder="country name..."
              />
              <span className="field__label-wrap">
                <span className="field__label">Your Country name.</span>
              </span>
            </label>
          </div>
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                id="state"
                defaultValue={formData.state}
                placeholder="State..."
              />
              <span className="field__label-wrap">
                <span className="field__label">State/Province name.</span>
              </span>
            </label>
          </div>
        </div>
        <div className="flex-box">
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                defaultValue={formData.city}
                name="city"
                id="city"
                placeholder="city name..."
              />
              <span className="field__label-wrap">
                <span className="field__label">Your City name.</span>
              </span>
            </label>
          </div>
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                name="zip"
                id="zip"
                defaultValue={formData.postal}
                placeholder="Zip/Postal Code..."
              />
              <span className="field__label-wrap">
                <span className="field__label">Zip/Postal Code.</span>
              </span>
            </label>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="page-view fading mt-70">
        <div className="hot-links">
          <Link to="/">
            <FaHome />
          </Link>
          <span>Register</span>
        </div>
      </div>
      {user_status && <Navigate to="/login" />}
      <div className="page-view">
        <div className="main-form ">
          <div className="blue-reg-form fading">
            <div className="user-profile">
              <div className="image">
                <img src="/media/users/user1.png" alt="" />
              </div>
              <span className="username">
                {formData.firstname + " " + formData.lastname}
              </span>
              <span className="email">Email Address: {formData.email}</span>
            </div>
            <h3>Edit your profile</h3>
            <form onSubmit={handleForm} className="form-width fading">
              <input type="hidden" id="slug" value={formData.slug} />
              <BillingInfo />
              <div style={{ textAlign: "center" }}>
                {Alert && (
                  <InlineMessage type={Alert.type} message={Alert.message} />
                )}
              </div>
              <br />
              {loading && <Loading />}
              {!loading && (
                <input
                  className="field__input submit-input"
                  value="Register"
                  type="submit"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
