import { useReducer } from "react";
import Header from "./Header";
import BalanceLoan from "./BalanceLoan";
import Buttons from "./Buttons";
const initialState = { isOpen: false, balance: 0, loan: 0 };
function reducer(state, action) {
  if (!state.isOpen && action.type !== "openAccount") return state;
  switch (action.type) {
    case "openAccount": {
      return { ...state, isOpen: true, balance: 500 };
    }
    case "deposite": {
      return { ...state, balance: state.balance + action.payload };
    }
    case "withdraw": {
      return { ...state, balance: state.balance - action.payload };
    }
    case "loan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    }
    case "payLoan": {
      if (state.loan > state.balance) return state;
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    }
    case "closeAccount": {
      if (state.loan !== 0 || state.balance !== 0) return state;
      return initialState;
    }
    default: {
      throw new Error("Unknown action type!");
    }
  }
}
function App() {
  const [{ isOpen, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <>
      <Header />
      <BalanceLoan balance={balance} loan={loan} />
      <Buttons
        isOpen={isOpen}
        balance={balance}
        loan={loan}
        dispatch={dispatch}
      />
    </>
  );
}
export default App;
