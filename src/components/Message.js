import React from "react";
import { useSelector } from "react-redux";

function Message(props) {
  const currentUser = useSelector((state) => state.login);

  let color = props.color;
  if (props.sender === "bunyamin") color = "gold";

  let messageFrom = "received";
  if (props.sender === currentUser.username) {
    messageFrom = "sent";
  }

  return (
    <div className={"msg " + messageFrom}>
      <div className="sender" style={{ color: color }}>
        {props.continous ? "" : props.sender}
      </div>
      <div className="message">
        <div>{props.text}</div>
        <div className="date">{props.sameDate ? "" : props.date}</div>
      </div>
    </div>
  );
}

export default Message;
