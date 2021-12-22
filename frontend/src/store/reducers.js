import * as _action_ from "./constants";

export const UserReducer = (state = { user: "" }, action) => {
  switch (action.type) {
    case _action_.USER_SUC:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
export const CrncyExchangeRed = (
  state = { currency: ["PKR_PKR", 1] },
  action
) => {
  switch (action.type) {
    case "CURRENCY_REQ":
      return {
        payload: state,
      };
    case "CURRENCY_SUCC":
      return {
        payload: action.payload,
      };
    default:
      return state;
  }
};
export const TopReducer = (state = { status: "", payload: {} }, action) => {
  switch (action.type) {
    case _action_.SHOW_MODAL:
      return {
        status: action.type,
        payload: action.payload,
      };
    case _action_.HIDE_MODAL:
      return {
        status: action.type,
        payload: { ModalType: "" },
      };
    case _action_.SHOW_MESSAGE:
      return {
        status: action.type,
        payload: action.payload,
      };
    case _action_.HIDE_MESSAGE:
      return {
        status: "",
        payload: {},
      };
    default:
      return state;
  }
};

// export const MessageBox = (
//   state = { message_state: true, msg: "", classes: "" },
//   action
// ) => {
//   switch (action.type) {
//     case true:
//       return {
//         msg: action.payload.msg,
//         classes: action.payload.classes,
//       };
//     case false:
//       return {
//         message_state: false,
//         msg: "",
//         classes: "",
//       };
//     default:
//       return {
//         message_state: false,
//         msg: "",
//         classes: "",
//       };
//   }
// };
