import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slice/account";
import postReducer from "../slice/post";
import commentReducer from "../slice/comment"
import bookmarkReducer from "../slice/bookmark";
const store = configureStore({
  reducer: {
    account: accountReducer,
    post: postReducer,
    comment: commentReducer,
    bookmark: bookmarkReducer,
  },
});
export default store;
