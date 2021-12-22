import { TopReducer, UserReducer, CrncyExchangeRed } from "./reducers";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
const initalState = {};

const reducer = combineReducers({
  TopReducer,
  UserReducer,
  CrncyExchangeRed,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initalState,
  composeEnhancer(applyMiddleware(thunk))
);
// const store = createStore(reducer, initalState);
export default store;
