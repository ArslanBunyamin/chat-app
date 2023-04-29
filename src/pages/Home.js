import React, { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setContinous, setSameDate } from "./messagesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

function Home(props) {
  const ms = useSelector((state) => state.messages);
  const messages = ms.messages;
  const dispatch = useDispatch();
  const myCollection = collection(db, "Messages");
  const q = query(myCollection, orderBy("time-stamp", "asc"));
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const currentUser = useSelector((state) => state.login);

  useEffect(() => {
    if (!currentUser.loggedIn) {
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });

    for (let i = 1; i < messages.length; i++) {
      if (messages[i].sender === messages[i - 1].sender) {
        dispatch(setContinous({ index: i, continous: true }));
      }
      if (
        messages[i].date === messages[i - 1].date &&
        messages[i].sender !== messages[i - 1].sender
      ) {
        dispatch(setSameDate({ index: i - 1, sameDate: true }));
      }
    }
  }, [messages, dispatch]);

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      dispatch(
        setMessages(
          snapshot.docs.map((doc) => ({
            message: doc.data().message,
            id: doc.id,
            sender: doc.data().sender,
            continous: false,
            date: doc.data().date,
            sameDate: false,
          }))
        )
      );
      for (let i = 1; i < messages.length; i++) {
        if (messages[i].sender === messages[i - 1].sender) {
          dispatch(setContinous({ index: i, continous: true }));
        }
        if (
          messages[i].date === messages[i - 1].date &&
          messages[i].sender !== messages[i - 1].sender
        ) {
          dispatch(setSameDate({ index: i - 1, sameDate: true }));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (input !== "") {
      let date = new Date();
      const hoursMin = date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      addDoc(myCollection, {
        message: input,
        "time-stamp": serverTimestamp(),
        date: hoursMin,
        sender: currentUser.username,
      });
      setInput("");
      inputRef.current.value = "";
    }
  }, [input]);

  return (
    <div className="App">
      <Helmet>
        <title>wowoo</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Helmet>
      <div className="container">
        <section className="top-section">
          <FontAwesomeIcon icon={faMessage} style={{ color: "blueviolet" }} />
          &nbsp;Wowoo
        </section>
        <section className="messages-section">
          {messages.map((messageObject) => (
            <Message
              text={messageObject.message}
              sender={messageObject.sender}
              continous={messageObject.continous}
              color={props.color}
              key={messageObject.id}
              date={messageObject.date}
              sameDate={messageObject.sameDate}
            />
          ))}
          <div ref={bottomRef} />
        </section>
        <footer className="sending-section">
          <form
            className="form"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              setInput(inputRef.current.value);
              inputRef.current.focus();
            }}
          >
            <input
              className="text-input clearable"
              type="search"
              placeholder="Mesaj yaz..."
              ref={inputRef}
              spellCheck="false"
              autoComplete="off"
              onFocus={() => {
                bottomRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <button type="submit" className="send-button">
              Gönder!
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default Home;
