import axios from "axios";
import * as _action_ from "./constants";

export const ShowModalAction = (ModalType) => (dispatch) => {
  dispatch({ type: _action_.SHOW_MODAL, payload: { ModalType } });
};

export const UserAuthAction = () => async (dispatch) => {
  let user = localStorage.getItem("user");
  if (user) {
    if (user === undefined || user === "" || user.length < 1 || user === null) {
      dispatch({
        type: _action_.USER_SUC,
        payload: {
          slug: "",
          firstame: "",
          lastname: "",
          condition: "NotExist",
        },
      });
    } else {
      user = JSON.parse(user);
      dispatch({
        type: _action_.USER_SUC,
        payload: { ...user, condition: "success" },
      });
    }
  } else {
    dispatch({
      type: _action_.USER_SUC,
      payload: {
        slug: "",
        firstame: "",
        lastname: "",
        condition: "NotExist",
      },
    });
  }
};

export const ServiceInfoAction =
  ({ slug, currency }) =>
  (dispatch) => {
    dispatch({
      type: _action_.SHOW_MODAL,
      payload: {
        ModalType: "SRVC_MODAL",
        data: { currency, src_view_slug: slug },
      },
    });
  };

export const DataFireToModalAction = (modal_type, data) => (dispatch) => {
  dispatch({
    type: _action_.SHOW_MODAL,
    payload: {
      ModalType: modal_type,
      data,
    },
  });
};

export const MessageAction =
  (classes = "", message = "", status = _action_.SHOW_MESSAGE) =>
  (dispatch) => {
    dispatch({
      type: status,
      payload: {
        classes,
        message,
      },
    });
  };

export const currencyExchangeAction = () => (dispatch) => {
  dispatch({
    type: "CURRENCY_REQ",
  });
  const getCrncRate = (crnc) => {
    if (crnc !== "PKR") {
      const convert = ("PKR_" + crnc).replace(/\s/g, "");
      let crnc_cookies = localStorage.getItem("currency");
      if (crnc_cookies) {
        crnc_cookies = JSON.parse(crnc_cookies);
        if (crnc_cookies[convert]) {
          return [convert, crnc_cookies[convert]];
        }
      }
      try {
        let url = "";
        axios.get("/api/currencyExchangeApiKey/" + convert).then((res) => {
          url = res.data;
        });
        axios.get(url).then((res) => {
          if (res.data[convert]) {
            const value = res.data[convert];
            localStorage.setItem("currency", JSON.stringify(res.data));
            return [convert, value];
          } else {
            return ["PKR_PKR", 1];
          }
        });
      } catch (error) {
        console.warn("Currency can't converting due to: ", error.message);
        return ["PKR_PKR", 1];
      }
    }
  };
  const getUser = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      return user.currency.replace(/\s/g, "");
    } else {
      return "USD";
    }
  };
  dispatch({
    type: "CURRENCY_SUCC",
    payload: { currency: getCrncRate(getUser()) },
  });
};
