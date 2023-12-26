/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CityContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoaded: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoaded: true };
    case "cities/loaded":
      return { ...state, isLoaded: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoaded: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoaded: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoaded: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoaded: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function ContextProvider({ children }) {
  const [{ cities, isLoaded, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    //--fetching all cities data from the remote API or remote server
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        //setting list of cities in the local or UI state cities
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    //calling a function here
    fetchCities();
  }, []);

  //getting current city based on the id from the remote API or state
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while loading current city",
      });
    }
  }
  //for creating a new city
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      //creating city at remote state
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //adding city in the UI state ie. cities
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error while creating a new city",
      });
    }
  }
  // for deleting a city with the given id
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      // for deleting city with the given id in the remote server
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      //for deleting city in the UI state
      dispatch({ type: "city/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("Error while deleting city");
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoaded,
        currentCity,
        error,
        getCity,
        deleteCity,
        createCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("you can not use city context outside the scope");
  return context;
}
export { useCity, ContextProvider };
