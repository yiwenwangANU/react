import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:9000";

function CityProvider({ children }) {
  const [cities, setcities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setcities(data);
      } catch (err) {
        throw new Error("Failed to fetch cities:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    const cityUrl = `${BASE_URL}/cities/${id}`;
    try {
      setIsLoading(true);
      const res = await fetch(cityUrl);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
