import React from "react";
import { useSelector } from "react-redux";

function Message(props) {
  const currentUser = useSelector((state) => state.login);

  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (props.sender === "bunyamin") color = "gold";

  let continous = "non-continous";
  if (props.continous) {
    continous = "continous";
  }

  let messageFrom = "received";
  if (props.sender === currentUser.username) {
    messageFrom = "sent";
  }

  return (
    <div className={messageFrom + " " + continous}>
      <div className="sender" style={{ color: color }}>
        {continous === "continous" ? "" : props.sender}
      </div>
      <div className="message">{props.text}</div>
    </div>
  );
}

export default Message;
