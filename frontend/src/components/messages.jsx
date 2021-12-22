import React from "react";
import { useDispatch } from "react-redux";
import { MessageAction } from "../store/actions";
import { HIDE_MESSAGE } from "../store/constants";
export default function Messages({ payload }) {
  const dispatch = useDispatch();
  return (
    <div className={"page-view message-box " + payload.classes}>
      <span
        onClick={() => dispatch(MessageAction("", "", HIDE_MESSAGE))}
        className="close-msg"
      >
        <i className="fa fa-times"></i>
      </span>
      <p>{payload.message}</p>
    </div>
  );
}
