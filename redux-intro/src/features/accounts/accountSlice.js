const initialStateAccount = { balance: 0, loan: 0, loanPurpose: null };
const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      if (action.payload > state.balance) return state;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      if (state.loan > 0)
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: 0,
          loanPurpose: null,
        };
      else return state;

    default:
      return state;
  }
};
export function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}

export default accountReducer;
