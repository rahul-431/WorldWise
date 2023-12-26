/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  function getPosition() {
    if (!navigator.geolocation) {
      return setError("your browser does not support geolocation");
    }
    setIsLoaded(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoaded(false);
      },
      (error) => setError(error.message)
    );
  }
  return { position, getPosition, error, isLoaded };
}
