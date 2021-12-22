import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InlineMessage from "../../components/inilne-message";
import { ShowModalAction } from "../../store/actions";
import Loading from "../../components/loading";
function RegistrationForm() {
  const [Alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordAgain: "",
    firstname: "",
    lastname: "",
    add1: "",
    add2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    mobile: "",
    currency: "PKR",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowModalAction("RFMInfo"));
  }, [dispatch]);
  const SendData = async (userData) => {
    setLoading(true);

    try {
      await axios
        .post("/api/register-user/", { formData: userData })
        .then((res) => {
          res = res.data.condition;
          if (res === "emailExist") {
            setAlert({
              type: "alert",
              message: "Email already exist please login with this email!",
            });
          }
          if (res === "success") {
            setAlert({
              type: "success",
              message: "successfully register!",
            });
            dispatch(ShowModalAction("succ-reg"));
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
    const email = event.target["email-box"].value;
    const password = event.target["password"].value;
    const passwordAgain = event.target["password-confirm"].value;
    const firstname = event.target["first-name"].value;
    const lastname = event.target["last-name"].value;
    const add1 = event.target["address-1"].value;
    const add2 = event.target["address-2"].value;
    const country = event.target["country"].value;
    const state = event.target["state"].value;
    const city = event.target["city"].value;
    const zip = event.target["zip"].value;
    const mobile = event.target["mobile"].value;
    const currency = event.target["currency"].value;
    setAlert(false);
    setFormData({
      email,
      password,
      passwordAgain,
      firstname,
      lastname,
      add1,
      add2,
      country,
      state,
      city,
      zip,
      mobile,
      currency,
    });
    if (email === "")
      setAlert({ type: "alert", message: "Enter email address..." });
    else if (
      password === "" ||
      password !== passwordAgain ||
      password.length < 6
    )
      setAlert({
        type: "alert",
        message:
          "Password is not matched (password must be greater than 6 characters)",
      });
    else if (mobile === "") {
      setAlert({
        type: "alert",
        message: "Please Enter mobile number!",
      });
    } else if (firstname === "" || lastname === "") {
      setAlert({
        type: "alert",
        message: "Enter firstname and lastname!",
      });
    } else if (add1 === "") {
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
        email,
        password,
        passwordAgain,
        firstname,
        lastname,
        add1,
        add2,
        country,
        state,
        city,
        zip,
        mobile,
        currency,
      });
    }
  };

  const AccountInfo = () => {
    return (
      <>
        <p className="form-head-links">
          I have already an account! just
          <Link to="/login"> Login</Link>
        </p>
        <h3>ACCOUNT INFORMATION</h3>
        <label className="field field_v2">
          <input
            className="field__input"
            type="email"
            defaultValue={formData.email}
            id="email-box"
            placeholder="enter email..."
          />
          <span className="field__label-wrap">
            <span className="field__label">Enter your Email</span>
          </span>
        </label>
        <div className="flex-box">
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                type="password"
                name="password"
                id="password"
                defaultValue={formData.password}
                placeholder="Enter password"
              />
              <span className="field__label-wrap">
                <span className="field__label">Enter Password</span>
              </span>
            </label>
          </div>
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                type="password"
                name="password-again"
                id="password-confirm"
                defaultValue={formData.passwordAgain}
                placeholder="Enter password again"
              />
              <span className="field__label-wrap">
                <span className="field__label">Confirm your Password</span>
              </span>
            </label>
          </div>
        </div>
      </>
    );
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
              <option value="PKR" selected>
                PKR (Pakistani Rupee)
              </option>
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
            defaultValue={formData.add1}
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
            defaultValue={formData.add2}
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
                defaultValue={formData.zip}
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
  const ContactInfo = () => {
    return (
      <>
        <h3>CONTACT INFORMATION</h3>
        <div className="flex-box">
          <div>
            <label className="field field_v2">
              <input
                className="field__input"
                name="mobile"
                id="mobile"
                defaultValue={formData.mobile}
                placeholder="Ex +0000000"
              />
              <span className="field__label-wrap">
                <span className="field__label">Mobile/Phone number.</span>
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
      <div className="page-view">
        <div className="main-form ">
          <div className="blue-reg-form fading">
            <h2 className="form-width">Registration</h2>
            <form onSubmit={handleForm} className="form-width fading">
              <AccountInfo />
              <ContactInfo />
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
export default RegistrationForm;
