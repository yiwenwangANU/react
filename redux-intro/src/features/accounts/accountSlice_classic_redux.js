const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: null,
  isLoading: false,
};
const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposite":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // return action
    dispatch({ type: "account/deposite", payload: converted });
  };
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
