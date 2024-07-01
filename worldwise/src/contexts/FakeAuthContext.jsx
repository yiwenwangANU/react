import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = { user: null, isAuthenticated: false };
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknow action type!");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ childern }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    initialState,
    reducer
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {childern}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside AuthProvider!");
  return context;
}
export { AuthProvider, useAuth };
