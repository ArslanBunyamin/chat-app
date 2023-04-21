import React from "react";
import { useSelector } from "react-redux";

function Message(props) {
  const currentUser = useSelector((state) => state.login);

  let color = "white";
  if (props.sender === "bunyamin") color = "gold";
  if (props.sender === "balinay") color = "deeppink";
  if (props.sender === "burag") color = "red";
  if (props.sender === "tyson") color = "cyan";
  if (props.sender === "yusufi") color = "salmon";

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
