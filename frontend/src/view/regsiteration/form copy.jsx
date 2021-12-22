import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import InlineMessage from "../../components/inilne-message";
import { ShowModalAction } from "../../store/actions";
function RegistrationForm() {
  const [FormCounter, setFormCounter] = useState(1);
  const [Alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordAgain: "",
    newsletter: true,
    firstname: "",
    lastname: "",
    add1: "",
    add2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    mobile: "",
  });
  function CheckInvalidChars(chars) {
    const invalid = " #$%^&*()-+=<>?/.,'/\"\\|[]}{`~!";
    for (let k = 0; k < chars.length; k++) {
      for (let i = 0; i < invalid.length; i++) {
        if (invalid[i] === chars[k]) {
          return 1;
        }
      }
    }
    return 0;
  }
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(ShowModalAction("RFMInfo"));
  // }, [dispatch]);
  const handleForm = async () => {
    setAlert(false);
    if (FormCounter === 1) {
      const email = document.getElementById("email-box").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const password_c = document.getElementById("password-confirm").value;
      const newsletter = document.getElementById("check-newsletter").checked;
      const data = { email, username };

      if (email.length > 5) {
        // await axios.post("/api/check-existance/", { data }).then((res) => {
        //   console.log(res.data);
        //   const response = res.data.condition;
        //    else {
        //     setFormData({ email, username });
        //   }
        //   console.log(response);
        // });
      }
      if (email.length < 1) {
        setAlert({
          type: "alert",
          message: "Please enter email address!",
        });
      } else if (username.length < 1) {
        setAlert({
          type: "alert",
          message: "Please enter username!",
        });
      } else if (CheckInvalidChars(username)) {
        setAlert({
          type: "alert",
          message:
            "invalid username! choose name without(#$%^&*()-+=<>?/.,'/\"\\|[]}{`~!) and whitespaces.",
        });
      } else if (password.length < 6 || password !== password_c) {
        setAlert({
          type: "alert",
          message:
            "Enter correct password (password must be greater than 6 characters).",
        });
      } else {
        setAlert({
          type: "success",
          message: "congrats first step completed!",
        });
        setFormData({
          email,
          username,
          password,
          passwordAgain: password_c,
          newsletter,
        });
        setFormCounter(2);
      }
    }
    if (FormCounter === 2) {
      const firstname = document.getElementById("first-name").value;
      const lastname = document.getElementById("last-name").value;
      const add1 = document.getElementById("address-1").value;
      const add2 = document.getElementById("address-2").value;
      const country = document.getElementById("country").value;
      const state = document.getElementById("state").value;
      const city = document.getElementById("city").value;
      const zip = document.getElementById("zip").value;
      if (firstname === "")
        setAlert({
          type: "alert",
          message: "Please enter firstname!.",
        });
      else if (lastname === "")
        setAlert({
          type: "alert",
          message: "Please enter lastname!.",
        });
      else if (add1 === "")
        setAlert({
          type: "alert",
          message: "Please enter Address 1!.",
        });
      else if (city === "")
        setAlert({
          type: "alert",
          message: "Please enter city name!.",
        });
      else if (zip === "")
        setAlert({
          type: "alert",
          message: "Please enter Zip/Postal code!.",
        });
      else {
        setAlert({
          type: "success",
          message: "congrats second step completed!",
        });
        setFormData({
          ...formData,
          firstname,
          lastname,
          add1,
          add2,
          country,
          state,
          city,
          zip,
        });
        setFormCounter(3);
      }
    }
    if (FormCounter === 3) {
      const mobile = document.getElementById("mobile").value;
      if (mobile.length < 1) {
        setAlert({
          type: "alert",
          message: "Please enter mobile number!.",
        });
      } else {
        setFormData({
          ...formData,
          mobile,
        });
        const sendData = () => {
          try {
            axios.post("/api/register-user/", { formData }).then((res) => {
              res = res.data.condition;
              console.log(res);
              if (res === "" || res === undefined) {
                setAlert({
                  type: "error",
                  message: "something going wrong! try again.",
                });
              }
              if (res === "emailExist") {
                setFormCounter(1);
                setAlert({
                  type: "alert",
                  message:
                    "Email already exist please choose another one or login!",
                });
              } else if (res === "userExist") {
                setAlert({
                  type: "alert",
                  message: "username already taken choose another username.",
                });
              } else if (res === "success") {
                console.log("super succ");
                setAlert({
                  type: "success",
                  message: "successfully completed!",
                });
              }
            });
          } catch (err) {
            setAlert({
              type: "alert",
              message: err.message,
            });
          }
        };
        sendData();
      }
    }
  };
  const checkExistance = async (target, value) => {
    if (value.length > 1) {
      await axios
        .get("/api/check-existance/" + value + "/" + target)
        .then((res) => {
          console.log(res);
          res = res.data.condition;
          if (res === "emailExist") {
            setAlert({
              type: "alert",
              message: "email already exist please login with this email.",
            });
          }
          if (res === "userExist") {
            setAlert({
              type: "alert",
              message: "username already taken choose another username.",
            });
          }
        });
    }
  };
  const AccountInfo = () => {
    return (
      <form className="form-width fading">
        <p className="form-head-links">
          I have already an account! just
          <Link to="/login"> Login</Link>
        </p>
        <h3>ACCOUNT INFORMATION</h3>
        <label htmlFor="email-box">Enter Email</label>
        <input
          type="text"
          defaultValue={formData.email}
          id="email-box"
          placeholder="Email..."
          onKeyUp={(e) => checkExistance("email", e.target.value)}
        />
        <div className="flex-box box-input">
          <input
            type="checkbox"
            name="newsletter"
            defaultChecked={formData.newsletter}
            id="check-newsletter"
          />
          <label htmlFor="check-newsletter">
            Keep me up to date on news and exclusive offers.
          </label>
        </div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="user"
          id="username"
          defaultValue={formData.username}
          placeholder="Enter username..."
        />
        <div className="flex-box">
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={formData.password}
              placeholder="Enter password"
            />
          </div>
          <div>
            <label htmlFor="password-confirm">confirm password</label>
            <input
              type="password"
              name="password-again"
              id="password-confirm"
              defaultValue={formData.passwordAgain}
              placeholder="Enter password again"
            />
          </div>
        </div>
      </form>
    );
  };
  const BillingInfo = () => {
    return (
      <form className="form-width fading">
        <h3>BILLING INFORMATION</h3>
        <div className="flex-box">
          <div>
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              defaultValue={formData.firstname}
              placeholder="First Name..."
            />
          </div>
          <div>
            <label htmlFor="password-confirm">Last name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              defaultValue={formData.lastname}
              placeholder="Last Name..."
            />
          </div>
        </div>
        <label htmlFor="address-1">Address 1</label>
        <input
          type="text"
          id="address-1"
          defaultValue={formData.add1}
          placeholder="Address..."
        />

        <label htmlFor="address-2">Address 2</label>
        <textarea
          type="text"
          id="address-2"
          defaultValue={formData.add2}
          placeholder="Address..."
        ></textarea>

        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          defaultValue={formData.country}
          placeholder="Country..."
        />

        <label htmlFor="state">state</label>
        <input
          type="text"
          id="state"
          defaultValue={formData.state}
          placeholder="State..."
        />

        <div className="flex-box">
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              defaultValue={formData.city}
              name="city"
              id="city"
              placeholder="City..."
            />
          </div>
          <div>
            <label htmlFor="zip">Zip/Postal Code</label>
            <input
              type="text"
              name="zip"
              id="zip"
              defaultValue={formData.zip}
              placeholder="Zip/Postal Code..."
            />
          </div>
        </div>
      </form>
    );
  };
  const ContactInfo = () => {
    return (
      <form className="form-width fading">
        <h3>CONTACT INFORMATION</h3>
        <div className="flex-box">
          <div>
            <label htmlFor="mobile">Mobile/Phone number</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              defaultValue={formData.mobile}
              placeholder="Ex +0000000"
            />
          </div>
        </div>
      </form>
    );
  };
  return (
    <>
      <div className="page-view fading">
        <div className="hot-links">
          <Link to="/">
            <FaHome />
          </Link>
          <span>Register</span>
        </div>
      </div>
      <div className="blue-reg-form fading">
        <div className="form-counter">
          <span
            onClick={() => setFormCounter(1)}
            className={FormCounter === 1 ? "open" : ""}
          >
            1
          </span>
          <span
            onClick={() => setFormCounter(2)}
            className={FormCounter === 2 ? "open" : ""}
          >
            2
          </span>
          <span
            onClick={() => setFormCounter(3)}
            className={FormCounter === 3 ? "open" : ""}
          >
            3
          </span>
        </div>
        <h2 className="form-width">Registration</h2>
        {FormCounter === 1 ? (
          <AccountInfo />
        ) : FormCounter === 2 ? (
          <BillingInfo />
        ) : (
          <ContactInfo />
        )}
        <div style={{ textAlign: "center" }}>
          {Alert && <InlineMessage type={Alert.type} message={Alert.message} />}
        </div>
        <button onClick={handleForm} className="form-width form-submit">
          Next
        </button>
      </div>
    </>
  );
}
export default RegistrationForm;
