import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
export default function App() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
        );
        const dataJson = await res.json();
        setResult(dataJson.rates[currencyTo]);
        setIsLoading(false);
        console.log(dataJson.rates[currencyTo]);
      }
      if (amount === "0") {
        setResult(0);
        return;
      }
      if (!amount || amount.length === 0 || Number(amount) < 0) return;
      if (currencyFrom === currencyTo) return;
      getData();
    },
    [currencyFrom, currencyTo, amount]
  );

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        onChange={(e) => setCurrencyFrom(e.target.value)}
        value={currencyFrom}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => setCurrencyTo(e.target.value)}
        value={currencyTo}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        OUTPUT{" "}
        {currencyFrom === currencyTo
          ? amount
          : amount === ""
          ? ""
          : Number(amount) === 0
          ? result
          : isLoading
          ? "fetching data..."
          : result}
      </p>
    </div>
  );
}
