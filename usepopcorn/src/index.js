import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App_v1";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} />
    <StarRating
      maxRating={5}
      size={24}
      message={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
      defaultRating={3}
    /> */}
  </React.StrictMode>
);
