function Buttons({ isOpen, balance, loan, dispatch }) {
  return (
    <div>
      <button
        disabled={isOpen}
        onClick={(e) => dispatch({ type: "openAccount" })}
      >
        Open Account
      </button>
      <button
        disabled={!isOpen}
        onClick={(e) => dispatch({ type: "deposite", payload: 150 })}
      >
        Deposite 150
      </button>
      <button
        disabled={!isOpen || balance < 50}
        onClick={(e) => dispatch({ type: "withdraw", payload: 50 })}
      >
        Withdraw 50
      </button>
      <br />
      <button
        disabled={!isOpen || loan > 0}
        onClick={(e) => dispatch({ type: "loan", payload: 5000 })}
      >
        Request a loan of 5000
      </button>
      <button
        disabled={!isOpen || balance < loan || loan === 0}
        onClick={(e) => dispatch({ type: "payLoan" })}
      >
        Pay Loan
      </button>
      <button
        disabled={!isOpen || balance !== 0 || loan !== 0}
        onClick={(e) => dispatch({ type: "closeAccount" })}
      >
        Close Account
      </button>
    </div>
  );
}

export default Buttons;
