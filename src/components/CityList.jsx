/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCity } from "../ContextProvider";

export default function CityList() {
  const { cities, isLoaded } = useCity();
  if (isLoaded) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on map" />;
  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
