import { useState } from "react";
import "./App.css";

const satisfaction = [
  {
    bill: 0,
    feel: "Dissatisfied",
  },
  {
    bill: 5,
    feel: "It was okay",
  },
  {
    bill: 10,
    feel: "It was good",
  },
  {
    bill: 20,
    feel: "Absolutely amazing!",
  },
];

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);
  return (
    <>
      <BillCalculator bill={bill} setBill={setBill} />
      <LikeService
        message="How did you like the service?"
        tip={tip}
        setTip={setTip}
      />
      <LikeService
        message="How did your friend like the service?"
        tip={friendTip}
        setTip={setFriendTip}
      />
      <Message bill={bill} tip={tip} friendTip={friendTip} />
      <Reset setBill={setBill} setTip={setTip} setFriendTip={setFriendTip} />
    </>
  );
}

function BillCalculator({ bill, setBill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        placeholder="Bill Value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}

function LikeService({ message, tip, setTip }) {
  return (
    <div>
      <span>{message}</span>
      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        {satisfaction.map((ele) => (
          <option value={ele.bill}>
            {ele.feel} ({ele.bill}%)
          </option>
        ))}
      </select>
    </div>
  );
}

function Message({ bill, tip, friendTip }) {
  const finalTip = (Number(tip) + Number(friendTip)) / 2;
  const totalBill = (finalTip / 100 + 1) * Number(bill);
  return <h1>You pay ${totalBill}</h1>;
}

function Reset({ setBill, setTip, setFriendTip }) {
  return (
    <button
      onClick={(e) => {
        setBill(0);
        setTip(0);
        setFriendTip(0);
      }}
    >
      Reset
    </button>
  );
}
export default App;
