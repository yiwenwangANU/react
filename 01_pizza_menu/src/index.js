import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello React</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // render things twice
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
