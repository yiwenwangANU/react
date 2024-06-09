import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  return <Counter />;
}

function Counter() {
  const [step, setStep] = useState(4);
  const [count, setCount] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);
  return (
    <>
      <div class="slidecontainer">
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          class="slider"
          id="myRange"
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>
      <div className="countcontainer">
        <button onClick={() => setCount(count - step)}>-</button>
        <span>
          Count:{" "}
          <input
            type="text"
            onChange={(e) => setCount(e.target.value)}
            value={count}
          />
        </span>
        <button onClick={() => setCount(+count + +step)}>+</button>
      </div>
      <div className="messagecontainer">
        <p>
          {count < 0 && `${-count} days ago is `}
          {count === 0 && "today is "}
          {count > 0 && `${count} days from today is `}
          {date.toDateString()}
        </p>
      </div>
    </>
  );
}
export default App;
