import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./static/css/libs.min.css";
import "./static/images/favicon.ico";
import "./static/css/socialv.css?v=4.0.0";
import "./static/css/messages.css";
import "./static/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./static/vendor/remixicon/fonts/remixicon.css";
import "./static/vendor/vanillajs-datepicker/datepicker.min.css";
import "./static/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
