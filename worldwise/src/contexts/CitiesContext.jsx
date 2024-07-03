import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:9000";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "currentCity/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type!");
  }
};
function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "Failed to fetch cities" });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      const cityUrl = `${BASE_URL}/cities/${id}`;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(cityUrl);
        const data = await res.json();
        dispatch({ type: "currentCity/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: "Failed to get city" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Failed to create city" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete city: ${res.statusText}`);
      }
      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Failed to delete city" });
    }
  }
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext was used outside CityProvider");
  return context;
}

export { CityProvider, useCity };
