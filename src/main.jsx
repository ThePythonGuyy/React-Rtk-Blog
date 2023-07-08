import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice.js";
import { fetchUsers } from "./features/user/userSlice.js";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  /* </React.StrictMode> */
);
