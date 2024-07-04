import { createStore } from "redux";
const initialState = { balance: 0, loan: 0, loanPurpose: null };

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer);
store.dispatch({ type: "account/deposite", payload: 500 });
console.log(store.getState());
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a Car" },
});
console.log(store.getState());
