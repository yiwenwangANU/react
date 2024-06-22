import { useReducer } from "react";
import Header from "./Header";
import BalanceLoan from "./BalanceLoan";
import Buttons from "./Buttons";
const initialState = { isOpen: false, balance: 0, loan: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "openAccount": {
      return { ...state, isOpen: true, balance: 500 };
    }
    case "deposite": {
      return { ...state, balance: state.balance + 150 };
    }
    case "withdraw": {
      return { ...state, balance: state.balance - 50 };
    }
    case "loan": {
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
      };
    }
    case "payLoan": {
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    }
    case "closeAccount": {
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
