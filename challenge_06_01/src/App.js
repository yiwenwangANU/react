import { useState } from "react";
import "./App.css";

function App() {
  return <Counter />;
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);

  function decStep() {
    if (step >= 2) {
      setStep((s) => s - 1);
    }
  }
  function incCount() {
    setCount((s) => s + step);
  }
  function decCount() {
    setCount((s) => s - step);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <button onClick={decStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={decCount}>-</button>
        <span>Count: {count}</span>
        <button onClick={incCount}>+</button>
      </div>
      <p>
        <span>{count === 0 ? "Today is " : ""}</span>
        <span>{count >= 0 ? `${count} days from today is ` : ""}</span>
        <span>{count <= 0 ? `${-count} days ago was ` : ""}</span>
        <span>{date.toDateString()}</span>
      </p>
    </div>
  );
}
export default App;
