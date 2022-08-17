import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/loginSlice";
import messagesReducer from "../pages/messagesSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    messages: messagesReducer,
  },
});
